const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Farmer's Tan</h3>
            <p className="text-primary-foreground/80">
              Sunless tanning for men, with a sense of humor.
            </p>
          </div>
          
          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Farmer's Tan</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Starter Kit</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Gift Sets</a></li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h4 className="font-bold mb-4">Learn More</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">How to Apply</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Bro FAQs</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal */}
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
          <p>© 2025 Farmer's Tan. All rights reserved. No farmers were harmed in the making of this product.</p>
          <p className="mt-2 text-sm">Powered by pure bro energy (and some really good skincare science).</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
