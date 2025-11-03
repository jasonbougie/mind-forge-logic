import sockTan from "@/assets/sock-tan.jpg";
import tankTan from "@/assets/tank-tan.jpg";

const problems = [
  {
    image: sockTan,
    problem: "Sock Tan from Golfing?",
    solution: "Fix it with Farmer's Tan!",
    description: "No more pale ankles ruining your shorts game."
  },
  {
    image: tankTan,
    problem: "Tank-Top Tan Before Vacation?",
    solution: "Farmer's Tan to the rescue!",
    description: "Even out those gnarly shoulder lines in one application."
  }
];

const ProblemSolutions = () => {
  return (
    <section className="py-20 bg-muted/50 wood-pattern">
      <div className="container px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Fix Any Tan Line Problem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether it's from golf, working outdoors, or sports – Farmer's Tan evens out any awkward tan lines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {problems.map((item, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.problem}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-destructive mb-2">
                  {item.problem}
                </h3>
                <p className="text-xl font-bold text-accent mb-3">
                  {item.solution}
                </p>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutions;
