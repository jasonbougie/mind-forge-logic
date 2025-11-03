import { Check, Zap, Sparkles, Shield } from "lucide-react";

const benefits = [
  {
    icon: Check,
    title: "Natural-Looking",
    description: "No Oompa Loompa Orange – just a subtle bronze that won't scream 'fake tan'."
  },
  {
    icon: Zap,
    title: "Quick & Easy",
    description: "10-minute application, quick-dry formula. Virtually impossible to mess up."
  },
  {
    icon: Sparkles,
    title: "No Grease, No Odor",
    description: "Won't stain your flannel. Water-based and lightweight – you'll forget you applied it."
  },
  {
    icon: Shield,
    title: "Bro-Tested",
    description: "Body-hair friendly and streak-free. Even first-timers get it right."
  }
];

const ProductBenefits = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Why Bros Love It
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Look great without the weird chemicals, orange hue, or that suspicious coconut smell.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefits;
