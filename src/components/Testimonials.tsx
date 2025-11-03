import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dave, 34",
    subtitle: "Actual Farmer",
    rating: 5,
    text: "I was skeptical, but Farmer's Tan saved me before my beach trip. No more tractor tan lines! My wife can't stop admiring my new glow."
  },
  {
    name: "Mike, 29",
    subtitle: "Golf Enthusiast",
    rating: 5,
    text: "Never thought I'd use a tanner, but this stuff is legit. My golf buddies couldn't figure out why I wasn't rocking the usual sock tan."
  },
  {
    name: "Brad, 41",
    subtitle: "Weekend Warrior",
    rating: 5,
    text: "Fixed my gnarly tank top lines in one application. Easy to use, doesn't smell weird, and actually works. What more could a bro ask for?"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Real Reviews from Real Bros
          </h2>
          <p className="text-lg text-muted-foreground">
            Join 1,000+ bros who've ditched their farmer's tan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
