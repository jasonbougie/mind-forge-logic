import { Link } from "react-router-dom";
import logo from "@/assets/dudetan-logo.png";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Dude Tan Logo" className="h-16 md:h-20 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-foreground hover:text-accent font-medium transition-colors">Product</a>
            <Link to="/shop" className="text-foreground hover:text-accent font-medium transition-colors">Shop</Link>
            <a href="#how-it-works" className="text-foreground hover:text-accent font-medium transition-colors">How It Works</a>
            <a href="#reviews" className="text-foreground hover:text-accent font-medium transition-colors">Reviews</a>
            <a href="#about" className="text-foreground hover:text-accent font-medium transition-colors">About</a>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <CartDrawer />
            <Link to="/shop">
              <Button variant="hero" size="sm">Shop Now</Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 md:hidden">
            <CartDrawer />
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
