import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You're on the list, dude! Drops and deals incoming.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-primary">
      <div className="container px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            Stay in the loop, dude.
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            New drops, deals, and stuff that doesn't suck. Straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
            />
            <Button 
              type="submit" 
              variant="hero" 
              size="lg"
            >
              Count Me In 🤙
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
