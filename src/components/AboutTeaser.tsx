import { Button } from "@/components/ui/button";

const AboutTeaser = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🌾</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Meet Farmer Stan
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Stan was just an average guy working under the sun – a farmer by trade, with a wicked farmer's tan to prove it. 
            One day, his buddy dared him to try his wife's sunless tanner... and the rest is history.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Seeing his pasty shoulders turn a golden brown (without any of the guys at the bar the wiser) sparked an idea. 
            Why not make a tanning product for men, one that guys could use on the sly and have a laugh about?
          </p>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
            Read Our Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
