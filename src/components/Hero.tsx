import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farmer-tan.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Man with farmer's tan at sunset on a farm" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-6 md:px-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-strong leading-tight">
            No More Farmer's Tan
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 text-shadow-strong">
            Get a Natural Bronze in Minutes!
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            The first sunless tanner made for men, with a sense of humor. No sunburn, no salon, no judgment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Get Your Tan Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto border-white text-white hover:bg-white hover:text-primary"
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
