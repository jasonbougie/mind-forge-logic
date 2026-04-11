import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CartDrawer } from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { ArrowLeft, Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { toast } from "sonner";
import logo from "@/assets/dudetan-logo.png";

/* ── Scroll-reveal wrapper ── */
const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`scroll-reveal ${isInView ? "in-view" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
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

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const INITIAL_FORM = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  businessType: "",
  cityState: "",
  locations: "1",
  monthlyUnits: "",
  heardAbout: "",
  notes: "",
};

const Wholesale = () => {
  const scrollY = useScrollPosition();
  const stepsView = useInView({ threshold: 0.2 });

  // Calculator state
  const [chairs, setChairs] = useState(3);
  const [clientsPerDay, setClientsPerDay] = useState(8);
  const [buyPercent, setBuyPercent] = useState(10);

  // Form state
  const [form, setForm] = useState(INITIAL_FORM);

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  // Calculator results
  const safeChairs = chairs || 0;
  const safeClients = clientsPerDay || 0;
  const monthlyUnits = Math.round(safeChairs * safeClients * 22 * (buyPercent / 100));
  const wholesaleCost = Math.round(monthlyUnits * 24.99);
  const retailRevenue = Math.round(monthlyUnits * 49.99);
  const monthlyProfit = Math.round(retailRevenue - wholesaleCost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Wholesale application submitted:", form);
    toast.success("Application received. We'll be in touch within 48 hours, dude.");
    setForm(INITIAL_FORM);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ── 1. Announcement Bar ── */}
      <div className="w-full bg-accent text-foreground overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-block px-8 text-xs md:text-sm font-medium tracking-wide">
              WHOLESALE INQUIRIES WELCOME &nbsp;·&nbsp; MINIMUM ORDER 12 UNITS &nbsp;·&nbsp; NET 30 AVAILABLE FOR QUALIFIED ACCOUNTS &nbsp;·&nbsp; EVEN IT OUT, DUDE. &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── 2. Navigation ── */}
      <nav
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-shadow duration-300"
        style={{ boxShadow: scrollY > 50 ? "0 2px 12px hsl(var(--foreground) / 0.08)" : "none" }}
      >
        <div className="container px-6 md:px-12 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-foreground hover:text-accent transition-colors" aria-label="Back to home">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Dude Tan" className="h-10 md:h-12 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="hero" size="sm" onClick={() => scrollTo("apply")} className="hidden sm:inline-flex">
              APPLY NOW
            </Button>
            <CartDrawer />
          </div>
        </div>
      </nav>

      {/* ── 3. Hero ── */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="container px-6 md:px-12 text-center max-w-4xl mx-auto">
          <RevealSection>
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent mb-6">TRADE & WHOLESALE PROGRAM</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-6">
              Put Dude Tan on your shelf. Your clients will grab it themselves.
            </h1>
            <p className="text-lg text-background/60 mb-10 max-w-2xl mx-auto">
              We make a product your male clients already need. You make margin every time a barber hands one across the chair. Simple as that.
            </p>
          </RevealSection>

          <RevealSection delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button variant="hero" className="h-12 px-8 text-lg" onClick={() => scrollTo("apply")}>
                APPLY NOW
              </Button>
              <Button variant="outline" className="h-12 px-8 text-lg border-2 border-background text-background hover:bg-background hover:text-foreground">
                DOWNLOAD SELL SHEET
              </Button>
            </div>
          </RevealSection>

          <RevealSection delay={0.25}>
            <div className="flex flex-wrap justify-center gap-3">
              {["50% retail margin", "12-unit minimum order", "Net 30 available"].map((pill) => (
                <span key={pill} className="bg-card/10 border border-background/20 text-background/80 px-4 py-2 rounded-full text-sm font-medium">
                  {pill}
                </span>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 4. Why carry Dude Tan ── */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16">Why carry Dude Tan</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "IT SELLS ITSELF", body: "Your barber hands it to a guy with a tan line situation. Guy looks in the mirror. Sale done. No pitch required." },
              { title: "REAL MARGIN", body: "Wholesale at $24.99. Retails at $49.99. That's $25 profit per unit on a product that fits in one hand and takes zero shelf space to explain." },
              { title: "CO-MARKETING INCLUDED", body: "Every opening order ships with Bronzon counter cards and a shelf talker. We make your display look intentional." },
            ].map((card, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="bg-card rounded-lg p-6 border-t-2 border-t-accent border border-border card-hover h-full">
                  <h3 className="text-sm font-bold tracking-widest text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground">{card.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Who it's for ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12 text-center">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Built for shops like yours.</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              If your male clients care about how they look when they leave your shop, they'll buy this.
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["Barbershops", "Men's grooming salons", "Golf pro shops", "Resort gift shops", "Outdoor retailers", "Fitness & sports clubs"].map((type) => (
                <span key={type} className="border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {type}
                </span>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div className="bg-card rounded-lg p-8 border-t-2 border-t-accent border border-border max-w-xl mx-auto text-left">
              <p className="text-xs font-bold tracking-widest text-accent mb-3">WHY BARBERSHOPS SPECIFICALLY</p>
              <p className="text-muted-foreground">
                The customer is already in your chair. Already thinking about how he looks. Already trusting your recommendation. That's the highest-converting sales moment in retail. Dude Tan is built for exactly that moment.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 6. How it works ── */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-16">How the program works.</h2>
          </RevealSection>
          <div ref={stepsView.ref} className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { num: "01", title: "APPLY", desc: "Fill out the form below. We review every application within 48 hours. No gatekeeping — we want good shops." },
              { num: "02", title: "OPEN YOUR ACCOUNT", desc: "Minimum opening order is 12 units. We ship within 3 business days. Net 30 terms available for qualified accounts." },
              { num: "03", title: "SELL & REORDER", desc: "Most accounts reorder within 30 days. Reorders drop to 6-unit minimums. You get a dedicated reorder link — no forms, no calls." },
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

      {/* ── 7. Margin calculator ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12 max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-4">Run the numbers.</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">See what Dude Tan does for your monthly revenue.</p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="calc-chairs" className="text-foreground font-medium mb-2 block">Chairs in your shop</Label>
                <Input
                  id="calc-chairs"
                  type="number"
                  value={chairs}
                  onChange={(e) => setChairs(Math.min(50, Math.max(0, parseInt(e.target.value) || 0)))}
                  min={1} max={50}
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="calc-clients" className="text-foreground font-medium mb-2 block">Clients per chair per day</Label>
                <Input
                  id="calc-clients"
                  type="number"
                  value={clientsPerDay}
                  onChange={(e) => setClientsPerDay(Math.min(30, Math.max(0, parseInt(e.target.value) || 0)))}
                  min={1} max={30}
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="calc-percent" className="text-foreground font-medium mb-2 block">
                  % who buy Dude Tan — <span className="text-accent font-bold">{buyPercent}%</span>
                </Label>
                <Slider
                  id="calc-percent"
                  value={[buyPercent]}
                  onValueChange={(v) => setBuyPercent(v[0])}
                  min={1} max={50} step={1}
                  className="py-2"
                  aria-label="Percentage of clients who buy Dude Tan"
                />
              </div>
            </div>

            <div className="bg-foreground rounded-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-xs tracking-widest text-background/50 mb-2">MONTHLY UNITS SOLD</p>
                  <p className="text-2xl font-bold text-background">{monthlyUnits}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-background/50 mb-2">WHOLESALE COST</p>
                  <p className="text-2xl font-bold text-background">${wholesaleCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-background/50 mb-2">RETAIL REVENUE</p>
                  <p className="text-2xl font-bold text-background">${retailRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-background/50 mb-2">YOUR MONTHLY PROFIT</p>
                  <p className="text-3xl md:text-4xl font-bold text-accent">${monthlyProfit.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Based on 22 selling days per month. Results vary by location and client volume.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── 8. Testimonial ── */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12 max-w-2xl mx-auto">
          <RevealSection>
            <div className="bg-card rounded-lg p-8 card-hover text-center">
              <span className="text-4xl text-accent/30 font-serif leading-none block mb-2">"</span>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6">
                We put it on the counter on a Thursday. Sold out of the opening order by Saturday. Clients were asking for it by name before we even reordered.
              </p>
              <p className="text-xs font-bold tracking-widest text-foreground">SHOP OWNER</p>
              <p className="text-xs tracking-widest text-muted-foreground">COMING SOON</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── 9. Application form ── */}
      <section id="apply" className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12 max-w-2xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-4">Apply for a wholesale account.</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              We review every application within 48 hours. Qualified accounts get Net 30 terms on their second order.
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-foreground font-medium mb-2 block">Business name</Label>
                <Input id="businessName" type="text" placeholder="Your shop name" value={form.businessName} onChange={(e) => updateField("businessName", e.target.value)} required className="h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="contactName" className="text-foreground font-medium mb-2 block">Your name</Label>
                <Input id="contactName" type="text" placeholder="First and last name" value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} required className="h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground font-medium mb-2 block">Email address</Label>
                <Input id="email" type="email" placeholder="you@yourshop.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} required className="h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground font-medium mb-2 block">Phone number</Label>
                <Input id="phone" type="tel" placeholder="(555) 555-5555" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} required className="h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="businessType" className="text-foreground font-medium mb-2 block">Business type</Label>
                <select
                  id="businessType"
                  value={form.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                  required
                  className="w-full h-12 rounded-md border border-border bg-background px-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select your business type</option>
                  <option value="barbershop">Barbershop</option>
                  <option value="grooming-salon">Men's grooming salon</option>
                  <option value="golf-pro-shop">Golf pro shop</option>
                  <option value="resort-hotel">Resort or hotel</option>
                  <option value="sporting-goods">Sporting goods</option>
                  <option value="fitness-gym">Fitness or gym</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="cityState" className="text-foreground font-medium mb-2 block">City and state</Label>
                <Input id="cityState" type="text" placeholder="Tampa, FL" value={form.cityState} onChange={(e) => updateField("cityState", e.target.value)} required className="h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="locations" className="text-foreground font-medium mb-2 block">How many locations?</Label>
                <Input id="locations" type="number" min={1} max={500} value={form.locations} onChange={(e) => updateField("locations", e.target.value)} required className="h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="monthlyUnits" className="text-foreground font-medium mb-2 block">Estimated monthly units</Label>
                <select
                  id="monthlyUnits"
                  value={form.monthlyUnits}
                  onChange={(e) => updateField("monthlyUnits", e.target.value)}
                  required
                  className="w-full h-12 rounded-md border border-border bg-background px-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select estimated volume</option>
                  <option value="12-24">12-24 units</option>
                  <option value="25-50">25-50 units</option>
                  <option value="51-100">51-100 units</option>
                  <option value="100+">100+ units</option>
                </select>
              </div>
              <div>
                <Label htmlFor="heardAbout" className="text-foreground font-medium mb-2 block">How did you hear about us? <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input id="heardAbout" type="text" placeholder="TikTok, a friend, Google..." value={form.heardAbout} onChange={(e) => updateField("heardAbout", e.target.value)} className="h-12 text-base" />
              </div>
              <div>
                <Label htmlFor="notes" className="text-foreground font-medium mb-2 block">Anything else we should know? <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <textarea
                  id="notes"
                  placeholder="Tell us about your shop..."
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-border bg-background px-3 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
              <Button type="submit" variant="hero" className="w-full h-14 text-lg">
                SUBMIT APPLICATION
              </Button>
            </form>
          </RevealSection>
        </div>
      </section>

      {/* ── 10. FAQ ── */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-6 md:px-12 max-w-3xl mx-auto">
          <RevealSection>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-12">Questions we get a lot.</h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <Accordion type="single" collapsible className="space-y-2">
              {[
                { q: "What is the minimum order?", a: "Opening orders are 12 units. Once your account is established, reorders drop to 6-unit minimums. Volume pricing is available at 50+ units." },
                { q: "What are the payment terms?", a: "Opening orders are prepaid. Net 30 terms are available for accounts in good standing after their second order. We accept all major cards and ACH." },
                { q: "Do you do consignment?", a: "We don't do consignment on opening orders. After your first reorder we can discuss extended terms for high-volume accounts." },
                { q: "What marketing support do you provide?", a: "Every opening order includes Bronzon counter cards and a shelf talker. Digital assets — social content, product photos, copy — are available on request through your account rep." },
                { q: "How quickly do you ship?", a: "Orders ship within 3 business days. Standard ground shipping is included on orders over $200." },
                { q: "Can I return unsold product?", a: "We stand behind the product. If it doesn't move in 60 days, contact us. We'll work something out." },
                { q: "Is there an exclusive territory program?", a: "Not currently. We're building the partner network first. Territory discussions are on the roadmap for established accounts." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-6">
                  <AccordionTrigger className="text-foreground font-bold text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealSection>
        </div>
      </section>

      {/* ── 11. Footer ── */}
      <Footer />
    </main>
  );
};

export default Wholesale;
