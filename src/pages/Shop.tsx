import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { Loader2, ShoppingBag, ArrowLeft, Plus, Minus, Star, Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { toast } from "sonner";
import logo from "@/assets/dudetan-logo.png";
import bottleFloating from "@/assets/bottle-floating.png";
import lifestyleBbq from "@/assets/lifestyle-bbq.jpg";
import lifestyleBeach from "@/assets/lifestyle-beach.jpg";
import lifestyleResults from "@/assets/lifestyle-results.jpg";

const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`scroll-reveal ${isInView ? "in-view" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

const QuantitySelector = ({ quantity, onChange }: { quantity: number; onChange: (q: number) => void }) => (
  <div className="flex items-center border border-border rounded-lg overflow-hidden">
    <button
      onClick={() => onChange(Math.max(1, quantity - 1))}
      className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
      aria-label="Decrease quantity"
    >
      <Minus className="h-4 w-4" />
    </button>
    <span className="px-4 py-2 text-foreground font-bold min-w-[3rem] text-center">{quantity}</span>
    <button
      onClick={() => onChange(Math.min(10, quantity + 1))}
      className="px-3 py-2 text-foreground hover:bg-muted transition-colors"
      aria-label="Increase quantity"
    >
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, {
          first: 20,
          query: "product_type:Tanner",
        });
        const edges = data?.data?.products?.edges || [];
        setProducts(edges);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct, qty: number) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${qty}x ${product.node.title} added to cart`);
  };

  const updateQuantity = (productId: string, qty: number) => {
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const benefits = [
    "Triple bronzer formula",
    "No streaks, no stains",
    "Dries in 60 seconds",
    "Odorless — zero coconut smell",
    "Vegan & cruelty-free",
    "Works on all skin tones",
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container px-6 md:px-12 py-3 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Dude Tan" className="h-10 md:h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/merch" className="text-foreground hover:text-accent font-medium transition-colors text-sm hidden md:block">Merch</Link>
            <CartDrawer />
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero: Floating Bottle ── */}
      <section className="relative overflow-hidden py-16 md:py-28 bg-gradient-to-b from-muted to-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="container px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Floating bottle */}
            <RevealSection className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl scale-110" />
                <img
                  src={bottleFloating}
                  alt="Dude Tan spray bottle floating"
                  className="relative w-64 md:w-80 animate-subtle-float drop-shadow-2xl"
                  width={800}
                  height={1024}
                />
              </div>
            </RevealSection>

            {/* Hero copy */}
            <RevealSection delay={0.15}>
              <p className="text-xs font-bold tracking-[0.3em] text-accent mb-4">THE GOODS</p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Even it out, dude.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                The only sunless tanner that doesn't make you feel like you're sneaking into a spa. Spray on, walk out even. That's it.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {benefits.slice(0, 3).map((b, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-sm text-foreground bg-muted px-3 py-1.5 rounded-full">
                    <Check className="h-3.5 w-3.5 text-accent" />
                    {b}
                  </span>
                ))}
              </div>
              <a href="#products">
                <Button variant="hero" className="h-12 px-8 text-lg shimmer-btn">
                  GRAB YOURS
                </Button>
              </a>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Lifestyle Gallery ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12">
          <RevealSection>
            <p className="text-xs font-bold tracking-[0.3em] text-accent text-center mb-3">REAL DUDES. REAL RESULTS.</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              No tan lines. No judgment.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <RevealSection delay={0} className="col-span-2 md:col-span-1 md:row-span-2">
              <div className="relative h-full min-h-[300px] md:min-h-[500px] rounded-xl overflow-hidden group">
                <img
                  src={lifestyleBeach}
                  alt="Man at the beach with an even natural tan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={768}
                  height={1024}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-bold text-background tracking-wider">BEACH READY</p>
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <div className="relative h-48 md:h-60 rounded-xl overflow-hidden group">
                <img
                  src={lifestyleBbq}
                  alt="Man at a barbecue showing off even tan in a tank top"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-bold text-background tracking-wider">BBQ SEASON</p>
              </div>
            </RevealSection>

            <RevealSection delay={0.15}>
              <div className="relative h-48 md:h-60 rounded-xl overflow-hidden group">
                <img
                  src={lifestyleResults}
                  alt="Close-up of even golden tan on man's chest and shoulder"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-bold text-background tracking-wider">EVEN RESULTS</p>
              </div>
            </RevealSection>

            <RevealSection delay={0.2} className="col-span-2">
              <div className="bg-card rounded-xl p-6 md:p-8 border border-border h-full flex flex-col justify-center">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground italic mb-3">
                  "My wife noticed before I did. She said I looked like I just got back from vacation. I was standing in my driveway."
                </p>
                <p className="text-xs font-bold tracking-widest text-muted-foreground">— MIKE T., TAMPA FL</p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── Why Dudes Pick This ── */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <RevealSection>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Why dudes pick this over everything else
              </h2>
            </RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, i) => (
                <RevealSection key={i} delay={i * 0.08}>
                  <div className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border card-hover">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section id="products" className="py-16 md:py-24 bg-background">
        <div className="container px-6 md:px-12">
          <RevealSection>
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.3em] text-accent mb-3">SHOP</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Pick Your Weapon</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Triple bronzer formula. Spray on, walk out even. No excuses.
              </p>
            </div>
          </RevealSection>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : products.length === 0 ? (
            <RevealSection>
              <div className="text-center py-20">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground mb-2">Products dropping soon.</p>
                <p className="text-sm text-muted-foreground">Check back shortly — we're stocking the shelves.</p>
              </div>
            </RevealSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product, i) => {
                const node = product.node;
                const image = node.images.edges[0]?.node;
                const price = parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2);
                const qty = quantities[node.id] || 1;

                return (
                  <RevealSection key={node.id} delay={i * 0.1}>
                    <div className="bg-card rounded-xl border border-border overflow-hidden card-hover group">
                      <Link to={`/product/${node.handle}`}>
                        <div className="aspect-square bg-muted overflow-hidden relative">
                          {image ? (
                            <img
                              src={image.url}
                              alt={image.altText || node.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-5 space-y-4">
                        <Link to={`/product/${node.handle}`}>
                          <h3 className="font-bold text-foreground text-lg group-hover:text-accent transition-colors">{node.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2">{node.description}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-foreground">${price}</span>
                          <QuantitySelector
                            quantity={qty}
                            onChange={(q) => updateQuantity(node.id, q)}
                          />
                        </div>

                        <Button
                          variant="cta"
                          className="w-full shimmer-btn"
                          onClick={() => handleAddToCart(product, qty)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            `ADD TO CART${qty > 1 ? ` (${qty})` : ""}`
                          )}
                        </Button>
                      </div>
                    </div>
                  </RevealSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="container px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <RevealSection>
              <img
                src={bottleFloating}
                alt="Dude Tan bottle"
                className="w-32 md:w-40 mx-auto mb-8 animate-subtle-float drop-shadow-xl"
                loading="lazy"
                width={800}
                height={1024}
              />
              <h2 className="text-3xl md:text-5xl font-bold text-background mb-4">
                Stop hiding. Start evening.
              </h2>
              <p className="text-lg text-background/70 mb-8">
                30 seconds. No smell. No streaks. Just an even tan that looks like it happened naturally.
              </p>
              <a href="#products">
                <Button variant="hero" className="h-14 px-10 text-lg shimmer-btn">
                  EVEN IT OUT, DUDE
                </Button>
              </a>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted border-t border-border">
        <div className="container px-6 md:px-12 text-center">
          <p className="text-xs text-muted-foreground">© 2026 Dude Tan · dudetan.shop</p>
        </div>
      </footer>
    </main>
  );
};

export default Shop;
