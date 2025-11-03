import { Button } from "@/components/ui/button";
import productBottle from "@/assets/product-bottle.jpg";

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-sunset rounded-3xl opacity-20 blur-2xl" />
              <img 
                src={productBottle}
                alt="Farmer's Tan Sunless Tanner Product Bottle"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Farmer's Tan Sunless Tanner
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              All it takes is a few pumps for a year-round tan – no sun, no salon.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👕</span>
                <div>
                  <h4 className="font-bold text-foreground">No Stains</h4>
                  <p className="text-muted-foreground">Doesn't stain clothes or sheets</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🐄</span>
                <div>
                  <h4 className="font-bold text-foreground">Odorless</h4>
                  <p className="text-muted-foreground">You won't smell like a coconut or a chemical plant</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-bold text-foreground">Quick Results</h4>
                  <p className="text-muted-foreground">Develops in ~6 hours for an even tan</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h4 className="font-bold text-foreground">Skin-Friendly</h4>
                  <p className="text-muted-foreground">Vegan, paraben-free, cruelty-free formula</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" className="text-lg px-8 py-6 h-auto">
                Buy Now - $39.99
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
