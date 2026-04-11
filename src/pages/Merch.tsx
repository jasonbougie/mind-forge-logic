import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { Loader2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import logo from "@/assets/dudetan-logo.png";

const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`scroll-reveal ${isInView ? "in-view" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

const Merch = () => {
  usePageMeta({
    title: "Dude Tan Merch | Hats, Shirts & Gear",
    description: "Rep the brand. Dude Tan hats, shirts, and hoodies for men who like to even it out.",
  });

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, {
          first: 50,
          query: "product_type:Merch",
        });
        const edges = data?.data?.products?.edges || [];
        setProducts(edges);
      } catch (error) {
        console.error("Failed to fetch merch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container px-6 md:px-12 py-3 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Dude Tan logo" className="h-10 md:h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/shop" className="text-foreground hover:text-accent font-medium transition-colors text-sm hidden md:block">Shop Tanner</Link>
            <CartDrawer />
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container px-6 md:px-12 py-12 md:py-20">
        <RevealSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Merch</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Rep the brand. Shirts, hats, hoodies — all the gear a dude needs.
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
              <p className="text-xl text-muted-foreground mb-2">Merch dropping soon.</p>
              <p className="text-sm text-muted-foreground">Shirts, hats, hoodies — the whole lineup is on its way.</p>
            </div>
          </RevealSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, i) => {
              const node = product.node;
              const image = node.images.edges[0]?.node;
              const price = parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2);

              return (
                <RevealSection key={node.id} delay={i * 0.1}>
                  <Link to={`/product/${node.handle}`} className="group block">
                    <div className="bg-card rounded-lg border border-border overflow-hidden card-hover">
                      <div className="aspect-square bg-muted overflow-hidden">
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || `${node.title} — Dude Tan`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-accent transition-colors">{node.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{node.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-foreground">${price}</span>
                          <span className="text-xs font-bold tracking-widest text-accent">VIEW DETAILS →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 bg-muted border-t border-border">
        <div className="container px-6 md:px-12 text-center">
          <p className="text-xs text-muted-foreground">© 2026 Dude Tan · dudetan.shop</p>
        </div>
      </footer>
    </main>
  );
};

export default Merch;
