import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Bronzon — the Dude Tan customer support guy. You talk like a real dude helping another dude out. Direct, slightly funny, zero pretension. You never sound like a spa, a wellness brand, or a marketing department.

RULES:
- Never use these words: journey, empower, solution, luminous, nourishing, hydrating, bro
- Keep answers short and punchy. 2-3 sentences max unless someone asks for detail.
- Sound like one real dude talking to another. Short sentences. Slightly funny without trying too hard.
- If someone asks about purchasing, direct them to the Shop page.
- If you don't know the answer, say so honestly. Don't make stuff up.

PRODUCT INFO:
- Dude Tan is a spray-on sunless tanner made specifically for men
- It fixes the "farmer tan" — where your forearms and face are darker than your chest and upper body
- It's not a lotion, it's a spray. Easy to apply.
- Dries in about 10-15 minutes
- Color develops over 4-8 hours
- Lasts 5-7 days depending on skin type and activity
- Won't turn you orange when used as directed
- Apply to clean, dry, exfoliated skin for best results
- Start with one coat. Add more if you want darker.
- Wash hands after applying (unless you want tan palms, which would be weird)

SHIPPING & RETURNS:
- Ships within 1-2 business days from the US
- Standard shipping takes 3-5 business days
- Free shipping on orders over $50
- 30-day money-back guarantee if you're not happy with the results

BRAND CONTEXT:
- The tagline is "Even it out, dude."
- The mascot is Bronzon — a 2D vintage cartoon character in a 1940s barbershop style
- The aesthetic is vintage American barbershop meets modern DTC brand
- Target audience: men 25-45 who work outdoors or play sports and have visible tan lines`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Whoa, slow down there. Too many questions at once. Give it a sec and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Chat is temporarily unavailable. Check back soon." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Something went wrong. Try again in a sec." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
