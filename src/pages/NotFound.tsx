import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import usePageMeta from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/button";
import logo from "@/assets/dudetan-logo.png";

const NotFound = () => {
  usePageMeta({
    title: "Page Not Found | Dude Tan",
    robots: "noindex",
  });

  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <img src={logo} alt="Dude Tan" className="h-16 md:h-20 w-auto mb-8" width={200} height={80} />
      <h1 className="text-8xl md:text-9xl font-bold text-accent mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        Wrong turn, dude.
      </p>
      <p className="text-lg text-muted-foreground mb-8">
        This page doesn't exist. Let's get you back on track.
      </p>
      <Link to="/">
        <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
