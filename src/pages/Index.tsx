import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductBenefits from "@/components/ProductBenefits";
import ProductShowcase from "@/components/ProductShowcase";
import ProblemSolutions from "@/components/ProblemSolutions";
import Testimonials from "@/components/Testimonials";
import AboutTeaser from "@/components/AboutTeaser";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Header />
      <Hero />
      <ProductBenefits />
      <ProductShowcase />
      <ProblemSolutions />
      <Testimonials />
      <AboutTeaser />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;
