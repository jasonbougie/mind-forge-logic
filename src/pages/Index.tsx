import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/dudetan-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { CartDrawer } from "@/components/CartDrawer";
import { useInView } from "@/hooks/useInView";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useActiveSection } from "@/hooks/useActiveSection";
import usePageMeta from "@/hooks/usePageMeta";

/* ── Scroll-reveal wrapper ── */
const RevealSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isInView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ── Animated counter ── */
const AnimatedNumber = ({ target, isInView }: { target: string; isInView: boolean }) => {
  const [display, setDisplay] = useState("00");

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target);
    let current = 0;
    const step = Math.max(1, Math.floor(num / 15));
    const interval = setInterval(() => {
      current = Math.min(current + step, num);
      setDisplay(current.toString().padStart(2, "0"));
      if (current >= num) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <span>{display}</span>;
};

/* ── Animated stars ── */
const AnimatedStars = ({ isInView }: { isInView: boolean }) => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, j) => (
      <Star
        key={j}
        className={`w-4 h-4 fill-accent text-accent transition-all duration-300 ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        style={{ transitionDelay: `${j * 100}ms` }}
      />
    ))}
  </div>
);

const NAV_SECTIONS = ["hero", "problem", "how-it-works", "reviews", "shop"];

const Index = () => {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection(NAV_SECTIONS);

  // Mobile carousel state
  const [currentReview, setCurrentReview] = useState(0);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  // Section in-view refs
  const stepsView = useInView({ threshold: 0.2 });
  const reviewsView = useInView({ threshold: 0.15 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list, dude! We'll let you know when we launch.");
      setEmail("");
    }
  };




  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinkClass = (section: string) =>
    `font-medium transition-colors text-sm ${
      activeSection === section
        ? "text-accent"
        : "text-foreground hover:text-accent"
    }`;

  const reviews = [
    { quote: "My wife noticed before I did. She said I looked like I just got back from a real vacation. I was standing in my driveway.", name: "MIKE T.", city: "TAMPA FL" },
    { quote: "I've been rocking a farmer tan since 2009. This thing fixed it in 45 seconds. I'm kind of annoyed it took this long to exist.", name: "DEREK R.", city: "PHOENIX AZ" },
    { quote: "Took it to the beach. Nobody said anything. That's exactly what I wanted.", name: "CHRIS M.", city: "CHARLESTON SC" },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* ── 1. Announcement Bar — Marquee ── */}
      <div className="w-full bg-accent text-foreground overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-block px-8 text-xs md:text-sm font-medium tracking-wide">
              FREE SHIPPING OVER $35 &nbsp;·&nbsp; TRIPLE BRONZER FORMULA &nbsp;·&nbsp; EVEN IT OUT, DUDE. &nbsp;·&nbsp; FREE SHIPPING OVER $35 &nbsp;·&nbsp; TRIPLE BRONZER FORMULA &nbsp;·&nbsp; EVEN IT OUT, DUDE. &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── 2. Navigation — sticky with blur + active state + cart ── */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-shadow duration-300"
        style={{ boxShadow: scrollY > 50 ? "0 2px 12px hsl(var(--foreground) / 0.08)" : "none" }}
      >
        <div className="container px-6 md:px-12 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex-shrink-0">
            <img src={logo} alt="Dude Tan" className="h-10 md:h-12 w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("problem")} className={navLinkClass("problem")}>The Problem</button>
            <button onClick={() => scrollTo("how-it-works")} className={navLinkClass("how-it-works")}>How It Works</button>
            <button onClick={() => scrollTo("reviews")} className={navLinkClass("reviews")}>Reviews</button>
            <Link to="/wholesale" className="text-foreground hover:text-accent font-medium transition-colors text-sm">Partners</Link>
            <Link to="/shop" className="text-foreground hover:text-accent font-medium transition-colors text-sm">Shop</Link>
            <Link to="/merch" className="text-foreground hover:text-accent font-medium transition-colors text-sm">Merch</Link>
            <CartDrawer />

          </div>

          <div className="flex items-center gap-2 md:hidden">
            <CartDrawer />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            <button onClick={() => scrollTo("problem")} className="text-foreground font-medium text-left">The Problem</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-foreground font-medium text-left">How It Works</button>
            <button onClick={() => scrollTo("reviews")} className="text-foreground font-medium text-left">Reviews</button>
            <Link to="/wholesale" className="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Partners</Link>
            <Link to="/shop" className="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/merch" className="text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Merch</Link>
          </div>
        )}
      </nav>

      {/* ── 3. Hero Section — parallax bg + animated CTA ── */}
      <section id="hero" className="relative overflow-hidden py-16 md:py-24">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Guys hanging out on a golf course in the sun"
            className="w-full h-full object-cover opacity-40 md:opacity-50"
            width={1920}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        </div>
        <div
          className="absolute inset-0 animate-gradient-shift opacity-15 z-[1]"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow z-[1]"
          style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.1}px))` }}
        />

        <div className="container px-6 md:px-12 relative z-10 flex flex-col items-center text-center gap-8">
          <div className={`transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}>
            <img
              src={logo}
              alt="Dude Tan - Triple Bronzer Formula"
              className="w-72 md:w-96 rounded-lg animate-subtle-float"
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
            <Link to="/shop">
              <Button
                variant="hero"
                className="h-12 px-8 text-lg animate-glow-pulse shimmer-btn"
              >
                SHOP NOW
              </Button>
            </Link>
            <Button variant="outline" className="h-12 px-8 text-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background">
              WATCH THE AD
            </Button>
          </div>
        </div>
      </section>

      {/* ── 4. The Problem Section — interactive comparison cards ── */}
      <section id="problem" className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <RevealSection>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                You look like two different people.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dark forearms. Pale chest. The classic mark of a man who works outside, plays hard, and never once thought about it. Until now. Dude Tan fixes what the sun started.
              </p>
            </RevealSection>

            <div className="flex flex-col gap-4">
              <RevealSection delay={0.1}>
                <div className="bg-card rounded-lg p-6 border border-border card-hover group cursor-default">
                  <p className="text-xs font-bold tracking-widest text-muted-foreground mb-3 group-hover:text-destructive transition-colors">THE OLD WAY</p>
                  <p className="text-foreground">
                    Live with it. Wear a shirt at the pool. Hope nobody notices.
                  </p>
                </div>
              </RevealSection>
              <RevealSection delay={0.2}>
                <div className="bg-card rounded-lg p-6 border-t-2 border-accent border-l border-r border-b border-l-border border-r-border border-b-border card-hover group cursor-default">
                  <p className="text-xs font-bold tracking-widest text-accent mb-3">THE DUDE TAN WAY</p>
                  <p className="text-foreground">
                    Spray it on in 30 seconds. Walk out even. Nobody says a word.
                  </p>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. How It Works — animated step counters ── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
              How It Works
            </h2>
          </RevealSection>
          <div ref={stepsView.ref} className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { num: "01", title: "SHAKE IT", desc: "Give the bottle three good shakes." },
              { num: "02", title: "SPRAY IT", desc: "Hold 6 inches away. Two sweeps across chest and upper arms. Done." },
              { num: "03", title: "OWN IT", desc: "Dries in 60 seconds. Even color. Nobody knows. You just look like you tan right." },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 0.15} className={`text-center px-6 py-8 ${i < 2 ? "md:border-r md:border-border" : ""}`}>
                <p className="text-5xl md:text-6xl font-bold text-accent mb-4">
                  <AnimatedNumber target={step.num} isInView={stepsView.isInView} />
                </p>
                <h3 className="text-lg font-bold text-foreground mb-3 tracking-wide">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Features Section — hover lift cards ── */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "SPRAY ON", desc: "Two sweeps. No streaks, no mess.", emoji: "💨" },
              { title: "TRIPLE BRONZER FORMULA", desc: "Three bronzing agents match your natural tan exactly.", emoji: "🔥" },
              { title: "BUILT FOR DUDES", desc: "Fast drying. No fragrance. No shiny finish.", emoji: "💪" },
            ].map((feature, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="bg-card rounded-lg p-6 border-t-2 border-t-accent border border-border card-hover group cursor-default">
                  <span className="text-2xl block mb-3 group-hover:scale-125 transition-transform duration-300 inline-block">{feature.emoji}</span>
                  <h3 className="text-sm font-bold tracking-widest text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Reviews Section — carousel on mobile ── */}
      <section id="reviews" className="py-16 md:py-24 bg-foreground">
        <div className="container px-6 md:px-12">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-background text-center mb-16">
              What Dudes Are Saying
            </h2>
          </RevealSection>

          {/* Desktop: grid */}
          <div ref={reviewsView.ref} className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, i) => (
              <RevealSection key={i} delay={i * 0.15}>
                <div className="bg-card rounded-lg p-6 card-hover h-full">
                  <span className="text-4xl text-accent/30 font-serif leading-none block mb-2">"</span>
                  <AnimatedStars isInView={reviewsView.isInView} />
                  <p className="text-muted-foreground italic mb-6">{review.quote}</p>
                  <p className="text-xs font-bold tracking-widest text-foreground">{review.name}</p>
                  <p className="text-xs tracking-widest text-muted-foreground">{review.city}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Mobile: swipeable carousel */}
          <div className="md:hidden">
            <div ref={reviewsContainerRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-2">
                    <div className="bg-card rounded-lg p-6">
                      <span className="text-4xl text-accent/30 font-serif leading-none block mb-2">"</span>
                      <AnimatedStars isInView={reviewsView.isInView} />
                      <p className="text-muted-foreground italic mb-6">{review.quote}</p>
                      <p className="text-xs font-bold tracking-widest text-foreground">{review.name}</p>
                      <p className="text-xs tracking-widest text-muted-foreground">{review.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentReview(Math.max(0, currentReview - 1))}
                className="text-background disabled:opacity-30 transition-opacity"
                disabled={currentReview === 0}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentReview ? "bg-accent w-6" : "bg-background/40"
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentReview(Math.min(reviews.length - 1, currentReview + 1))}
                className="text-background disabled:opacity-30 transition-opacity"
                disabled={currentReview === reviews.length - 1}
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Buy CTA Section — high energy ── */}
      <section id="shop" className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12 text-center">
          <RevealSection>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-accent/50 hidden md:block" />
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                Even it out, dude.
              </h2>
              <span className="h-px w-12 bg-accent/50 hidden md:block" />
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <p className="text-xs md:text-sm font-bold tracking-widest text-muted-foreground mb-8">
              TRIPLE BRONZER FORMULA · 4 FL OZ · 30-DAY SUPPLY
            </p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <p className="text-5xl md:text-6xl font-bold text-foreground mb-8 animate-glow-pulse inline-block">
              $49.99
            </p>
          </RevealSection>

          <RevealSection delay={0.3}>
            <Link to="/shop">
              <Button
                variant="hero"
                className="h-14 px-12 text-lg mb-4 shimmer-btn"
              >
                SHOP NOW
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-4">
              Free shipping over $35 · 30-day money back guarantee · No questions asked
            </p>
          </RevealSection>

          {/* Email capture */}
          <RevealSection delay={0.4}>
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
          </RevealSection>
        </div>
      </section>

      {/* ── 9. Footer ── */}
      <footer className="py-12 bg-muted border-t border-border">
        <div className="container px-6 md:px-12 text-center">
          <img src={logo} alt="Dude Tan" className="h-12 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-6">Even it out, dude. 🤙</p>

          <div className="w-16 h-px bg-accent/50 mx-auto mb-6" />

          <div className="flex justify-center gap-6 mb-6">
            {["Instagram", "TikTok", "X"].map((social) => (
              <a key={social} href="#" className="text-sm text-foreground hover:text-accent transition-colors font-medium hover:scale-110 transition-transform duration-200 inline-block">
                {social}
              </a>
            ))}
          </div>

          <div className="flex justify-center gap-6 mb-8">
            {["Contact", "Shipping", "Returns"].map((link) => (
              <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">© 2026 Dude Tan · dudetan.shop</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
