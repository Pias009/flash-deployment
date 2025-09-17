import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Eye, Lock, AlertCircle, CheckCircle2, Send } from 'lucide-react';

const Warning = () => {
  useEffect(() => {
    document.title = 'FlashCoin - Security Warnings & Safety Guidelines';
  }, []);

  const securityTips = [
    {
      title: 'Verify App Authenticity',
      description: 'Only download FlashCoin from our official website. Never download from third-party sources.',
      icon: Shield,
      level: 'critical'
    },
    {
      title: 'Protect Your Private Keys',
      description: 'Never share your private keys, seed phrases, or passwords with anyone.',
      icon: Lock,
      level: 'critical'
    },
    {
      title: 'Check Transaction Details',
      description: 'Always verify recipient addresses and amounts before confirming transactions.',
      icon: Eye,
      level: 'important'
    },
    {
      title: 'Use Secure Networks',
      description: 'Avoid using public Wi-Fi for cryptocurrency transactions. Use trusted networks only.',
      icon: AlertTriangle,
      level: 'important'
    }
  ];

  const commonScams = [
    {
      title: 'Fake Support Contacts',
      description: 'Scammers may impersonate FlashCoin support. We will never ask for your private keys.',
      warning: 'Never share sensitive information via phone, email, or chat.'
    },
    {
      title: 'Phishing Websites',
      description: 'Fraudulent websites may look identical to FlashCoin. Always check the URL.',
      warning: 'Only use our official domain and verified links.'
    },
    {
      title: 'Investment Scams',
      description: 'Be wary of guaranteed returns or pressure to invest quickly.',
      warning: 'FlashCoin never guarantees profits or pressures users to invest.'
    },
    {
      title: 'Fake Apps',
      description: 'Malicious apps may steal your credentials and funds.',
      warning: 'Download only from our official website.'
    }
  ];

  const safetyChecklist = [
    'Downloaded FlashCoin from the official website',
    'Enabled two-factor authentication',
    'Stored backup of recovery phrases securely',
    'Verified all transaction details before sending',
    'Using strong, unique passwords',
    'Keeping the app updated to latest version'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-destructive/20">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Security Warnings & 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Safety Guidelines</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Your security is our top priority. Please read these important warnings and 
              guidelines to protect yourself from scams and security threats.
            </p>

            <Alert className="border-destructive/50 bg-destructive/10 max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive font-medium">
                <strong>Important:</strong> FlashCoin will never ask for your private keys, passwords, or seed phrases. 
                Be extremely cautious of anyone claiming to be from FlashCoin support.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-shield/20 text-success border-success/20">
              Security Best Practices
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Essential Security Tips
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow these critical security measures to keep your FlashCoin safe and secure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className={`p-8 border-2 transition-all duration-300 ${
                  tip.level === 'critical' 
                    ? 'border-destructive/50 bg-destructive/5 hover:border-destructive' 
                    : 'border-warning/50 bg-warning/5 hover:border-warning'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      tip.level === 'critical' ? 'bg-destructive/20' : 'bg-warning/20'
                    }`}>
                      <tip.icon className={`w-6 h-6 ${
                        tip.level === 'critical' ? 'text-destructive' : 'text-warning'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-foreground">{tip.title}</h3>
                        <Badge variant={tip.level === 'critical' ? 'destructive' : 'outline'} className="text-xs">
                          {tip.level.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Scams */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-destructive/20 text-destructive border-destructive/20">
              Threat Awareness
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Common Scams to Avoid
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed about common cryptocurrency scams and learn how to identify them
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {commonScams.map((scam, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="p-8 bg-gradient-to-br from-card to-card/50 border border-border/20 hover:border-destructive/40 transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="p-3 rounded-full bg-destructive/20">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{scam.title}</h3>
                      <p className="text-muted-foreground">{scam.description}</p>
                    </div>
                  </div>
                  
                  <Alert className="border-destructive/50 bg-destructive/10">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive font-medium">
                      <strong>Warning:</strong> {scam.warning}
                    </AlertDescription>
                  </Alert>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Checklist */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-success/20 text-success border-success/20">
                Security Checklist
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                FlashCoin Safety Checklist
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Use this checklist to ensure you've taken all necessary security measures 
                to protect your FlashCoin assets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8 bg-gradient-to-br from-card to-card/50 border border-border/20">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-success mr-3" />
                  Security Checklist
                </h3>
                
                <div className="space-y-4">
                  {safetyChecklist.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/10 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full border-2 border-success flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Need Security Help?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              If you suspect your account has been compromised or need security assistance, 
              contact our official support immediately.
            </p>
            
            <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-lg border border-primary-foreground/20">
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">Official Support Channels</h3>
              <div className="grid md:grid-cols-2 gap-6 text-primary-foreground/90">
                <div>
                  <a href="https://t.me/flashersupportx" target="_blank" rel="noopener noreferrer" >
                    <Button variant="outline" className="text-sm sm:text-base md:text-lg px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-2xl border-gray-300 hover:bg-white hover:text-black transition-all flex items-center gap-2">
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      SUPPORT TALK
                    </Button>
                  </a>
                </div>
                <div>
                  <strong>Response Time:</strong> Within 24 hours
                </div>
              </div>
              
              <Alert className="mt-6 border-primary-foreground/30 bg-primary-foreground/10">
                <AlertCircle className="h-4 w-4 text-primary-foreground" />
                <AlertDescription className="text-primary-foreground">
                  <strong>Remember:</strong> Our support team will never ask for your private keys or passwords.
                </AlertDescription>
              </Alert>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Warning;