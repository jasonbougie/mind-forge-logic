import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/dudetan-logo.jpg";

const Index = () => {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list, dude! We'll let you know when we launch.");
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-6 py-12">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-shift opacity-30" />
      
      {/* Animated radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />

      {/* Decorative rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-primary/10 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-accent/10 rounded-full animate-spin-slow-reverse pointer-events-none" />

      <div className="max-w-md w-full flex flex-col items-center text-center gap-8 relative z-10">
        {/* Logo with entrance animation */}
        <div
          className={`transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
          }`}
        >
          <img
            src={logo}
            alt="Dude Tan - Triple Bronzer Formula"
            className="w-[36rem] md:w-[40rem] rounded-lg shadow-lg animate-subtle-float hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text with staggered entrance */}
        <div
          className={`space-y-3 transition-all duration-1000 ease-out delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            <span className="inline-block animate-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:200%_auto] bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A sunless tanner made for <span className="font-bold text-accent animate-pulse">DUDES</span>. No sunburn, no salon, no judgment.
          </p>
        </div>

        {/* Form with entrance animation */}
        <form
          onSubmit={handleSubmit}
          className={`w-full flex flex-col sm:flex-row gap-3 transition-all duration-1000 ease-out delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-12 text-base border-2 border-primary/30 focus:border-accent transition-all duration-300 hover:border-primary/50"
          />
          <Button
            type="submit"
            variant="hero"
            className="h-12 px-8 relative overflow-hidden group"
          >
            <span className="relative z-10">Notify Me 🤙</span>
            <span className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </Button>
        </form>

        {/* Tagline with entrance */}
        <p
          className={`text-sm text-muted-foreground transition-all duration-1000 ease-out delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Even it out, dude. 🤙
        </p>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 w-full animate-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1350,62 1440,50 L1440,100 L0,100 Z"
            fill="hsl(var(--primary))"
            fillOpacity="0.08"
          />
        </svg>
        <svg className="absolute bottom-0 w-full animate-wave-delayed" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,60 C360,10 720,90 1080,40 C1260,25 1350,45 1440,60 L1440,100 L0,100 Z"
            fill="hsl(var(--accent))"
            fillOpacity="0.05"
          />
        </svg>
      </div>
    </main>
  );
};

export default Index;
