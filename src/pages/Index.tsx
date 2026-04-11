import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/dudetan-logo.jpg";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list, dude! We'll let you know when we launch.");
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full flex flex-col items-center text-center gap-8">
        <img
          src={logo}
          alt="Dude Tan - Triple Bronzer Formula"
          className="w-[36rem] md:w-[40rem] rounded-lg shadow-lg"
        />

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground">
            A sunless tanner made for dudes. No sunburn, no salon, no judgment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" className="whitespace-nowrap">
            Notify Me
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          Even it out, dude. 🤙
        </p>
      </div>
    </main>
  );
};

export default Index;
