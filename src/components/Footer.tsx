import logo from "@/assets/dudetan-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <img src={logo} alt="Dude Tan logo — even it out, dude" className="w-48 h-auto mb-4" loading="lazy" />
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
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="https://www.instagram.com/dude_tan/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@thedude.tan" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">TikTok</a></li>
              <li><a href="https://www.youtube.com/@DudeTan_Shop" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">YouTube</a></li>
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
