'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Cross, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.heading',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
          },
        }
      );

      gsap.to('.heading', {
        backgroundPosition: '200% 50%',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.fromTo(
        '.description',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
          },
        }
      );

      gsap.fromTo(
        '.action-buttons',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
          },
        }
      );

      gsap.fromTo(
        '.features',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden text-white pt-16 "
      style={{
        backgroundImage: 'linear-gradient(to bottom, #0a1a2f 40%, #000000 100%)',
      }}
    >
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col justify-center items-center text-center space-y-6 sm:space-y-10 min-h-[80vh] max-w-5xl mx-auto">
          <motion.img
            src={logo}
            alt="logo"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-24 h-24 sm:w-40 sm:h-40 mb-2"
          />

          <h1
            className="heading relative inline-block text-3xl sm:text-5xl md:text-6xl font-extrabold leading-snug sm:leading-tight tracking-tight bg-gradient-to-r from-[#fcffe7] via-[#1e3a8a] to-[#00bfff] bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% 200%',
              backgroundPosition: '0% 50%',
              transition: 'background-position 1s',
            }}
          >
            FLASH – The Next-Gen Crypto Power
          </h1>

          <p className="description text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl">
            Lightning fast. Fully decentralized. Built for traders and Web3 innovators.
          </p>

          <div className="action-buttons flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a
              href="/APK/FlashGenerator-2.5.apk"
              download
              className="text-sm sm:text-base md:text-lg px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Download APK
            </a>
            <a
              href="https://t.me/flashersupportx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                
                className="text-sm sm:text-base md:text-lg px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-2xl border-gray-300 hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                <Cross className="w-4 h-4 sm:w-5 sm:h-5" />
                SUPPORT TALK
              </Button>
            </a>
          </div>

          <div className="features grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 text-xs sm:text-sm md:text-base text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              Secure Smart Contracts
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              Instant Transactions
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              Cross-chain Ready
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-20 right-20 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-blue-700 opacity-20 blur-3xl rounded-full animate-pulse"></div>
    </section>
  );
};

export default HeroSection;
