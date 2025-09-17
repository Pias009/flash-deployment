import { useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Smartphone, 
  CloudAlert,
  Shield, 
  Clock, 
  TrendingUp,
  Users,
  Globe,
  Zap
} from 'lucide-react';

// Lazy load sections


const Home = () => {
  useEffect(() => {
    document.title = 'FlashCoin - Next Generation Crypto Exchange';
  }, []);

  const stats = [
    { value: '20k+', label: 'Active Users', icon: Users },
    { value: '$2B+', label: 'Volume Traded', icon: TrendingUp },
    { value: '10+', label: 'Countries', icon: Globe },
    { value: '99.9%', label: 'Uptime', icon: Shield },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Download APK',
      description: 'Download quickly by providing basic details and securing your account in Flash Coin.',
      icon: Download,
      color: 'primary'
    },
    {
      step: '02', 
      title: 'Select Your Network',
      description: 'Select your preferred network Tron to Flash Coin.',
      icon:CloudAlert,
      color: 'secondary'
    },
    {
      step: '03',
      title: 'Get Flash Coin Instantly',
      description: 'With just a tap, your Flash Coin is delivered directly to your wallet!',
      icon: Zap,
      color: 'accent'
    }
  ];

  const features = [
    {
      title: 'Instant Conversions',
      description: 'Exchange USD or crypto to Flash Coin in real-time, with no delays.',
      icon: Clock,
      gradient: 'from-primary to-primary-variant'
    },
    {
      title: 'Low Fees',
      description: 'Keep more of your profits with our competitive transaction fees.',
      icon: TrendingUp,
      gradient: 'from-success to-accent'
    },
    {
      title: 'User-Friendly Interface',
      description: 'Whether you\'re new to crypto or experienced, the app is intuitive and easy to navigate.',
      icon: Smartphone,
      gradient: 'from-secondary to-primary'
    },
    {
      title: 'Advanced Security',
      description: 'All your transactions are secured with top-tier encryption in Flash Coin App.',
      icon: Shield,
      gradient: 'from-destructive to-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the revolution of seamless cryptocurrency exchange
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-card to-card/50 border border-border/20 hover:border-primary/40 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How Flash Coin Exchange Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A simple, 3-step process to convert your USD and crypto to Flash Coin in no time
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="p-8 text-center bg-gradient-to-br from-card to-card/50 border border-border/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden">
                  {/* Step number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                    {step.step}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${
                        step.color === 'primary' ? 'from-primary to-primary-variant' :
                        step.color === 'secondary' ? 'from-secondary to-secondary-glow' :
                        'from-accent to-accent-glow'
                      } shadow-lg`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* You can lazy load features if it's a separate component */}
      {/* <Suspense fallback={<div>Loading Features...</div>}>
        <FeaturesSection />
      </Suspense> */}

   
    
      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Get Exchange in 30 minutes!
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Flash Coin Exchange uses cutting-edge security to protect your data and assets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Now
              </Button>
             
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;