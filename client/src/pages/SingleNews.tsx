'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const SingleNews = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/news/${slug}`);
        const data = await response.json();
        setArticle(data);
        document.title = `${data.title} - FlashCoin News`;
      } catch (error) {
        console.error('Error fetching news article:', error);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-start space-x-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-6">
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border border-border/20">
            <img src={article.image} alt={article.title} className="w-full h-96 object-contain mb-8" />
            <div
              className="prose prose-invert max-w-none text-left"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SingleNews;