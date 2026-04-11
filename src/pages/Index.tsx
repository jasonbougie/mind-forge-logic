import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Star } from "lucide-react";
import logo from "@/assets/dudetan-logo.png";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY } from "@/lib/shopify";

const Index = () => {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addItem, isLoading } = useCartStore();
  const [shopifyProduct, setShopifyProduct] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Fetch first product for Buy CTA
    storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 1 }).then((data) => {
      const product = data?.data?.products?.edges?.[0];
      if (product) setShopifyProduct(product);
    }).catch(console.error);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list, dude! We'll let you know when we launch.");
      setEmail("");
    }
  };

  const handleAddToCart = async () => {
    if (!shopifyProduct) return;
    const variant = shopifyProduct.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    toast.success("Added to cart!");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Announcement Bar */}
      <div className="w-full bg-accent text-foreground text-center py-2 px-4 text-xs md:text-sm font-medium tracking-wide">
        FREE SHIPPING OVER $35 · TRIPLE BRONZER FORMULA · EVEN IT OUT, DUDE.
      </div>

      {/* 2. Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container px-6 md:px-12 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex-shrink-0">
            <img src={logo} alt="Dude Tan" className="h-10 md:h-12 w-auto" />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("problem")} className="text-foreground hover:text-accent font-medium transition-colors text-sm">The Problem</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-foreground hover:text-accent font-medium transition-colors text-sm">How It Works</button>
            <button onClick={() => scrollTo("reviews")} className="text-foreground hover:text-accent font-medium transition-colors text-sm">Reviews</button>
            <Button variant="hero" size="sm" onClick={() => scrollTo("shop")}>Shop Now</Button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            <button onClick={() => scrollTo("problem")} className="text-foreground font-medium text-left">The Problem</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-foreground font-medium text-left">How It Works</button>
            <button onClick={() => scrollTo("reviews")} className="text-foreground font-medium text-left">Reviews</button>
            <Button variant="hero" size="sm" onClick={() => scrollTo("shop")}>Shop Now</Button>
          </div>
        )}
      </nav>

      {/* 3. Hero Section */}
      <section id="hero" className="relative overflow-hidden py-16 md:py-24">
        {/* Background effects from coming soon page */}
        <div className="absolute inset-0 animate-gradient-shift opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />

        <div className="container px-6 md:px-12 relative z-10 flex flex-col items-center text-center gap-8">
          <div className={`transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}>
            <img
              src={logo}
              alt="Dude Tan - Triple Bronzer Formula"
              className="w-72 md:w-96 rounded-lg shadow-lg animate-subtle-float"
            />
          </div>

          <div className={`space-y-4 max-w-2xl transition-all duration-1000 ease-out delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Even it out, dude.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              The first sunless tanner made for <span className="font-bold text-accent">DUDES</span>. No sunburn, no salon, no judgment.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Button variant="hero" className="h-12 px-8 text-lg" onClick={() => scrollTo("shop")}>
              SHOP NOW
            </Button>
            <Button variant="outline" className="h-12 px-8 text-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background">
              WATCH THE AD
            </Button>
          </div>
        </div>
      </section>

      {/* 4. The Problem Section */}
      <section id="problem" className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                You look like two different people.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dark forearms. Pale chest. The classic mark of a man who works outside, plays hard, and never once thought about it. Until now. Dude Tan fixes what the sun started.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-card rounded-lg p-6 border border-border">
                <p className="text-xs font-bold tracking-widest text-muted-foreground mb-3">THE OLD WAY</p>
                <p className="text-foreground">
                  Live with it. Wear a shirt at the pool. Hope nobody notices.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border-t-2 border-accent border-l border-r border-b border-l-border border-r-border border-b-border">
                <p className="text-xs font-bold tracking-widest text-accent mb-3">THE DUDE TAN WAY</p>
                <p className="text-foreground">
                  Spray it on in 30 seconds. Walk out even. Nobody says a word.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { num: "01", title: "SHAKE IT", desc: "Give the bottle three good shakes." },
              { num: "02", title: "SPRAY IT", desc: "Hold 6 inches away. Two sweeps across chest and upper arms. Done." },
              { num: "03", title: "OWN IT", desc: "Dries in 60 seconds. Even color. Nobody knows. You just look like you tan right." },
            ].map((step, i) => (
              <div key={i} className={`text-center px-6 py-8 ${i < 2 ? "md:border-r md:border-border" : ""}`}>
                <p className="text-5xl md:text-6xl font-bold text-accent mb-4">{step.num}</p>
                <h3 className="text-lg font-bold text-foreground mb-3 tracking-wide">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "SPRAY ON", desc: "Two sweeps. No streaks, no mess." },
              { title: "TRIPLE BRONZER FORMULA", desc: "Three bronzing agents match your natural tan exactly." },
              { title: "BUILT FOR DUDES", desc: "Fast drying. No fragrance. No shiny finish." },
            ].map((feature, i) => (
              <div key={i} className="bg-card rounded-lg p-6 border-t-2 border-t-accent border border-border">
                <h3 className="text-sm font-bold tracking-widest text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Reviews Section */}
      <section id="reviews" className="py-16 md:py-24 bg-foreground">
        <div className="container px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold text-background text-center mb-16">
            What Dudes Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { quote: "My wife noticed before I did. She said I looked like I just got back from a real vacation. I was standing in my driveway.", name: "MIKE T.", city: "TAMPA FL" },
              { quote: "I've been rocking a farmer tan since 2009. This thing fixed it in 45 seconds. I'm kind of annoyed it took this long to exist.", name: "DEREK R.", city: "PHOENIX AZ" },
              { quote: "Took it to the beach. Nobody said anything. That's exactly what I wanted.", name: "CHRIS M.", city: "CHARLESTON SC" },
            ].map((review, i) => (
              <div key={i} className="bg-card rounded-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">"{review.quote}"</p>
                <p className="text-xs font-bold tracking-widest text-foreground">{review.name}</p>
                <p className="text-xs tracking-widest text-muted-foreground">{review.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Buy CTA Section */}
      <section id="shop" className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Even it out, dude.
          </h2>
          <p className="text-xs md:text-sm font-bold tracking-widest text-muted-foreground mb-8">
            TRIPLE BRONZER FORMULA · 4 FL OZ · 30-DAY SUPPLY
          </p>
          <p className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            $49.99
          </p>
          <Button
            variant="hero"
            className="h-14 px-12 text-lg mb-4"
            onClick={handleAddToCart}
            disabled={isLoading || !shopifyProduct}
          >
            {isLoading ? "ADDING..." : "ADD TO CART"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Free shipping over $35 · 30-day money back guarantee · No questions asked
          </p>

          {/* Email capture preserved */}
          <div className="mt-16 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground mb-4">Get notified about drops and deals:</p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base border-2 border-border focus:border-accent transition-all duration-300"
              />
              <Button type="submit" variant="hero" className="h-12 px-8">
                Notify Me 🤙
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="py-12 bg-muted border-t border-border">
        <div className="container px-6 md:px-12 text-center">
          <img src={logo} alt="Dude Tan" className="h-12 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-6">Even it out, dude. 🤙</p>

          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-sm text-foreground hover:text-accent transition-colors font-medium">Instagram</a>
            <a href="#" className="text-sm text-foreground hover:text-accent transition-colors font-medium">TikTok</a>
            <a href="#" className="text-sm text-foreground hover:text-accent transition-colors font-medium">X</a>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Shipping</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Returns</a>
          </div>

          <p className="text-xs text-muted-foreground">© 2026 Dude Tan · dudetan.shop</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
