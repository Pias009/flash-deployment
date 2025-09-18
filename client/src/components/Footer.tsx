import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Warning', path: '/warning' },
    { name: 'News', path: '/news' },
    { name: 'Platfroms', path: '/contact' },
  ];

  return (
    <footer className="bg-gradient-dark border-t border-border/20 relative">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FlashCoin
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-md">
              Convert USD and Cryptos to Flash Coin with Ease – Fast, Secure, and Convenient.
              Experience seamless digital currency exchange with Flash Coin.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-base font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-base font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {['Instant Conversions', 'Low Fees', '24/7 Access', 'Advanced Security'].map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 pt-4 border-t border-border/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <p className="text-muted-foreground text-xs">
              © 2024 FlashCoin. All rights reserved. 
            </p>
            <div className="flex space-x-4 text-xs text-muted-foreground">
              <Link to="/condition" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="https://t.me/flashersupportx" className="hover:text-primary transition-colors">Support</Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <Link to="/https://t.me/flashersupportx" className="hover:text-primary transition-colors">

</Link>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </footer>
  );
};

export default Footer;