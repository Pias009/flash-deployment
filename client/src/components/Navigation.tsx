import logo from '/src/assets/logo.png';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Warning', path: '/warning' },
    { name: 'News', path: '/news' },
    { name: 'Road Map', path: '/contact' },
    { name: 'Suported Platfrom ', path: '/apk' },
    { name: 'Get API ', path: '/Get API' },
    { name: ' ', path: '/Rz7' },


  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-elegant" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="Flash Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-4 py-2 rounded-lg transition-all duration-300",
                  "hover:text-primary hover:shadow-primary/20",
                  location.pathname === item.path
                    ? "text-primary bg-primary/10 shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-primary/10 rounded-lg border border-primary/20"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Download Button */}
          <div className="hidden lg:block">
           <a
  href="/APK/FlashGenerator-2.5.apk"
  download
>
  <Button 
    variant="default"
    className="bg-gradient-primary text-primary-foreground shadow-primary hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
  >
    <Download className="w-4 h-4 mr-2" />
    Download
  </Button>
</a>

          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-border"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg transition-all duration-300",
                        location.pathname === item.path
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
             <motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
  className="lg:hidden mt-4 pb-4 border-t border-border bg-black/80 backdrop-blur-md rounded-xl"
>

                  <Button className="w-full bg-gradient-primary text-primary-foreground">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;