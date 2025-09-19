'use client';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Globe,
  Zap,
} from 'lucide-react';

// Motion configuration
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    document.title = 'FlashCoin - Latest News & Updates';
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/news`);
        const data = await response.json();
        setNewsArticles(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Latest News &{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Updates
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay informed with the latest FlashCoin developments, partnerships,
              security updates, and community news.
            </p>

          
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}

      {/* News Grid */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <Link to={`/news/${article.slug}`} key={article.slug}>
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="overflow-hidden border border-border/20 hover:border-primary/40">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${article.image}`}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-primary">
              <h2 className="text-4xl font-bold text-primary-foreground mb-6">
                Stay Updated with FlashCoin News
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Get the latest updates, security alerts, and important announcements 
                delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
                />
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/60 mt-4">
                No spam, only important FlashCoin updates. Unsubscribe anytime.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;