import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import bronzonIcon from "@/assets/bronzon-chat.png";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Something went wrong. Try again.");
    return;
  }

  if (!resp.body) {
    onError("No response received.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: readerDone, value } = await reader.read();
    if (readerDone) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        done = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  // Flush remaining buffer
  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const NUDGE_MESSAGES = [
  "Got a farmer tan? Ask me about it.",
  "Wondering how to even it out, dude?",
  "Got questions? I got answers.",
  "First time? I'll walk you through it.",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nudge, setNudge] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Nudge bubble: show after 5s, rotate every 8s, hide after interaction
  useEffect(() => {
    if (hasInteracted || isOpen) {
      setNudge(null);
      return;
    }

    const showTimer = setTimeout(() => {
      setNudge(NUDGE_MESSAGES[0]);
    }, 5000);

    const rotateTimer = setInterval(() => {
      setNudge((prev) => {
        const idx = prev ? NUDGE_MESSAGES.indexOf(prev) : -1;
        return NUDGE_MESSAGES[(idx + 1) % NUDGE_MESSAGES.length];
      });
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, [hasInteracted, isOpen]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
    setNudge(null);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
        onError: (msg) => {
          toast.error(msg);
          setIsLoading(false);
        },
      });
    } catch {
      toast.error("Couldn't reach the chat. Try again in a sec.");
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  return (
    <>
      {/* Nudge speech bubble */}
      {nudge && !isOpen && (
        <div
          className="fixed bottom-[88px] right-6 z-[60] animate-fade-in cursor-pointer"
          onClick={handleOpen}
        >
          <div className="bg-card border border-border rounded-xl rounded-br-sm shadow-lg px-4 py-3 max-w-[220px] relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasInteracted(true);
                setNudge(null);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs hover:bg-accent transition-colors"
              aria-label="Dismiss"
            >
              ×
            </button>
            <p className="text-sm font-serif text-foreground font-medium">{nudge}</p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleOpen}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-105 overflow-hidden border-2 border-primary ${!hasInteracted && !isOpen ? "animate-[bounce_2s_ease-in-out_infinite]" : ""} ${isOpen ? "hidden md:flex" : ""}`}
      >
        {isOpen ? (
          <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </div>
        ) : (
          <img src={bronzonIcon} alt="Chat with Bronzon" className="w-full h-full object-cover" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed z-[60] bg-card border border-border shadow-2xl flex flex-col overflow-hidden md:bottom-24 md:right-6 md:w-[360px] md:h-[500px] md:max-h-[calc(100vh-8rem)] md:rounded-xl inset-0 md:inset-auto">
          {/* Header */}
          <div className="bg-foreground text-background px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">B</div>
            <div className="flex-1">
              <p className="font-bold text-sm font-serif">Bronzon</p>
              <p className="text-xs opacity-75">Dude Tan Support</p>
            </div>
            <button
              onClick={handleOpen}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-background/20 transition-colors text-background"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <p className="font-serif font-bold text-foreground mb-1">Got questions?</p>
                <p>Ask about the product, shipping, how to apply — whatever you need, dude.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bronzon anything..."
                disabled={isLoading}
                className="flex-1 text-sm"
              />
              <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
