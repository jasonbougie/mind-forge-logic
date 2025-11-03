import { Check, Zap, Sparkles, Shield, Leaf, Clock } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Instant Bronze",
    description: "See results immediately – no waiting 6-8 hours. Perfect for when you need that glow now."
  },
  {
    icon: Sparkles,
    title: "Spray-On Simplicity",
    description: "Quick, streak-free application. No messy mitts or sleeping in it – just spray and go."
  },
  {
    icon: Leaf,
    title: "Cleaner Formula",
    description: "Vegan, cruelty-free, paraben-free, gluten-free. Plus caffeine for that subtle skin-tightening perk."
  },
  {
    icon: Shield,
    title: "Complete System",
    description: "Scrub + Barrier Cream + Tan Extender included. Pro-level results at home for about $2 per tan."
  },
  {
    icon: Check,
    title: "No BS Ingredients",
    description: "Fewer preservatives, transparent formula. We tell you to refrigerate it – because we keep it real."
  },
  {
    icon: Clock,
    title: "Built for Real Life",
    description: "Body-hair friendly, fade-proof, no weird odor. For men who don't have time for complicated routines."
  }
];

const ProductBenefits = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Why Men Choose Farmer's Tan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional results without the hassle, weird chemicals, or obvious fake tan look.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
