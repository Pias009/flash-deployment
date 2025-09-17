// File: components/TimelineSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const steps = [
  {
    title: 'YOUR ORDER',
    desc: 'Our software first verifies all the details of your order, with your payment being the top priority in the verification process.',
  },
  {
    title: 'FLASH GENERATOR SOFTWARE',
    desc: 'App connects with Web3-compatible software.',
  },
  {
    title: 'PAYMENT VERIFICATION UPDATE',
    desc: 'If your payment is verified, you can proceed to the next step. If not, your order will be rejected.',
  },
  {
    title: 'SOFTWARE USED',
    desc: 'REMIX IDE',
  },
  {
    title: 'FLASH GENERATOR ACTION',
    desc: 'Flash request will be initiated with USDT value.',
  },
  {
    title: 'GENERATE PROCESS',
    desc: 'Flash USDT: $75,000. TG USR: @yourtgusername',
  },
  {
    title: 'FLASH KEEPER ADDRESS',
    desc: 'Enter your wallet address',
  },
  {
    title: 'IMPORTANT NOTE',
    desc: 'If your address is correct, the order will be successful. If there is an error, it will be pending. This entire process is based on Web3 technology, which means it is decentralized and immutable. As a result, modifications are not possible — even if you wish to change your address, it cannot be altered.',
  },
  {
    title: 'STATUS RESULTS',
    desc: 'SUBMITTED, PENDING, REJECTED, SUCCESSFUL',
  },
];

const Arrow = ({ direction = 'down' }: { direction?: 'down' | 'right' }) => (
  <div className="flex justify-center items-center -my-4">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {direction === 'down' ? (
        <path
          d="M16 6v20M16 26l-8-8M16 26l8-8"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M6 16h20M26 16l-8-8M26 16l-8 8"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  </div>
);

const TimelineSection = () => {
  const mid = Math.ceil(steps.length / 2);
  const leftSteps = steps.slice(0, mid);
  const rightSteps = steps.slice(mid);

  return (
    <>
    <Navigation />
    <section className="bg-background text-foreground py-20 px-4" aria-labelledby="timeline-heading">
      <div className="container mx-auto max-w-6xl">
        <motion.header
          id="timeline-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">How Flash Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the step-by-step process of Flash transactions, from order verification to successful completion.
          </p>
        </motion.header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-8">
            {leftSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-card p-6 rounded-xl border border-primary/30 shadow-sm"
                >
                  <div className="text-primary font-semibold text-xl mb-2">Step {idx + 1}</div>
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </motion.div>
                {idx < leftSteps.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
          </div>

          {/* Vertical Line */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-1 h-full bg-primary/40 rounded-full" />
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-8">
            {rightSteps.map((step, idx) => (
              <React.Fragment key={mid + idx}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (mid + idx) * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-card p-6 rounded-xl border border-primary/30 shadow-sm"
                >
                  <div className="text-primary font-semibold text-xl mb-2">Step {mid + idx + 1}</div>
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </motion.div>
                {idx < rightSteps.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default TimelineSection;
