import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "You're all set!",
      description: "You're now subscribed to Farmer's Tan Field Reports.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 gradient-hero">
      <div className="container px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Join the Farmer's Tan Field Reports
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get tips, deals, and the latest updates. We promise our emails won't suck.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
            />
            <Button 
              type="submit" 
              variant="hero" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
