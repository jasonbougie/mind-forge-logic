import logo from "@/assets/dudetan-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <img src={logo} alt="Dude Tan" className="h-12 mb-4" />
            <p className="text-primary-foreground/80">
              The first sunless tanner made for dudes. No sunburn, no salon, no judgment.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="/shop" className="hover:text-primary-foreground transition-colors">Dude Tan Spray</a></li>
              <li><a href="/shop" className="hover:text-primary-foreground transition-colors">Starter Kit</a></li>
              <li><a href="/shop" className="hover:text-primary-foreground transition-colors">Gift Sets</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Learn More</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">How to Apply</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping Info</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>© 2026 Dude Tan · dudetan.shop · All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
