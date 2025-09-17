'use client';

import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./APKPage.css"; // <-- Import the new CSS file

const wallets = [
  {
    name: 'Trust Wallet',
    icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png',
  },
  {
    name: 'Okx Wallet',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEWa7SwAAACd8S2h9y5ysCGU5CuL1iie8y2O2imZ6ywWIQY8XBF0syFgkxyS4Cp7vSM1UQ98vyMNEwQSGwVooB4QFwUcLAg/YhIjNgouRg0oPQtEIJYrAAAB6UlEQVR4nO3dXVIqMRCAUSegmQHxH9S7/4Ve591YHU0k6jkL6Oqv4LFrcnEBAAAAAAAAAAAAcE4paIyxn5DnbcjtUrNMWm5jY+fuiflpCtpVLJPmY3TsU+5Yt65yE91kmvab8Nh8Fx/b+VdM1/FVpnjhpmLqdefC7dkLtwq/RqHCAoUKG1KosEChwoYUKixQqLAhhQoLFCpsSKHCAoUKG1KosEChwoYUKixQqLChdB9f5VhR+BAfe9/7ZugUXuUQv+3Jh/DU3dIxbpXmfWyT4yGlfBmTUzo8xsY+9z/7SnkTk9P8EvxdXq7CUzffcLoXll+DgW+JnY/VOlnCgdN0c+5lP+WyovBqpD9fmEKF41OocHwKFY5PocLxKVQ4PoUKx6dQ4fgUKhyfQoXjU6hwfAoVjk+hwvFV3WL8yML8Lxx4GumeJkWPl3Kao4kVN1G5/9HX/Bzb+rHyri34sa9997u2ZRf8XXrdJp46xq1q7ksfKu5Lw59r635f+gduhBUqfJ9ChQ0pVFigUGFDChUWKFTYkEKFBQoVNqRQYYFChQ0pVFigUGFDChUWKFTY0B8o/P3vrs3xVe4q7mmCn9da9T6Bi79/eKx6/zB8iNT7/cN1mfO+YfkNN36//h1SAAAAAAAAAAAAgA/8B9SyN/Jw4BBdAAAAAElFTkSuQmCC',
  },
  {
    name: 'MetaMask',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png',
  },
  {
    name: 'Zeroing Wallet',
    icon: 'https://pbs.twimg.com/media/GvBnkauWkAAwzvJ.jpg', // placeholder, replace with real if available
  },
  {
    name: 'Frame Wallet',
    icon: 'https://a.fsdn.com/allura/s/frame-wallet/icon?d2835533b559d08bffcd849246e595f4b69666c70dd41568b3f6517b79fb7f42?&w=148',
  },
  {
    name: 'Taho Wallet',
    icon: 'data:image/png;base64,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', // placeholder, replace with real if available
  },
  {
    name: 'Rainbow Wallet',
    icon: 'https://rainbow.me/favicon.ico',
  },
];

const exchanges = [
  {
    name: 'Binance',
    icon: 'data:image/jpeg;base64,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',
  },
  {
    name: 'Bybit',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnyeJEwiZ-JJ1NiRSwNMpZj7kNxZOo0wcEmQ&s',
  },
  {
    name: 'BitGET',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbD9nP82fnO65uM8NVRaY6ilbEViOYJ7vEQ&s',
  },
  {
    name: 'KUcoin',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7OXsX2YNdCWzi5TGGD0WrFboIYnFA50hT9yhR1bk&usqp=CAE&s',
  },
];

const web2GamblingSites = [
  '7X Bet',
  'Binolla',
  'Web.de',
  'Betting.com',
  'Zyngapoker.com',
  'Stake.com',
  'CK44.com',
  'Melbet',
  '22Bet',
];

const web2Brokers = [
  'Binolla',
  'Poketoption',
  'Binomo',
  'iQ option',
  'Deriv',
];

const guidelineItems = [
  { text: 'Around 80% of Web2 gambling sites accept Flash USDT — but always double-check before making a transaction.', status: 'good' },
  { text: 'Never deposit more than $500 at once — higher deposits may trigger a verification process, which often leads to account bans.', status: 'bad' },
  { text: 'Avoid withdrawing more than the platform’s minimum limit — larger withdrawals may be flagged for verification, putting your account at risk.', status: 'bad' },
  { text: 'Deposit and withdraw in smaller amounts, more frequently — this reduces the chance of triggering any verification processes.', status: 'good' },
  { text: 'Always stay cautious and protect your account & funds.', status: 'warn' },
];

const statusColor = {
  good: 'text-green-400',
  bad: 'text-red-500',
  warn: 'text-yellow-400',
};

const APKP = () => {
  useEffect(() => {
    // Animate each .neon-card one by one
    const cards = Array.from(document.querySelectorAll('.neon-card'));
    cards.forEach((card, i) => {
      card.classList.remove('neon-animate');
      setTimeout(() => {
        card.classList.add('neon-animate');
      }, i * 100); // 100ms delay between each card (faster)
    });
    // Remove animation class after animation ends
    setTimeout(() => {
      cards.forEach(card => card.classList.remove('neon-animate'));
    }, cards.length * 100 + 900); // adjust total duration accordingly
  }, []);

  return (
    <>
      <Navigation />

      <section className="min-h-screen text-white py-12 px-6 max-w-5xl mx-auto font-sans">
        <h1 className="main-title">Crypto & Web-2 Finance Guide</h1>

        <div className="mb-12">
          <h2 className="section-title">Popular Web3 Wallets</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {wallets.map(({ name, icon }) => (
              <li
                key={name}
                className="flex items-center gap-3 bg-zinc-900 rounded-xl p-4 shadow-lg hover:bg-zinc-800 transition border border-zinc-800 neon-card"
              >
                <img
                  src={icon}
                  alt={`${name} icon`}
                  className="w-8 h-8 object-contain rounded bg-zinc-800 p-1"
                  loading="lazy"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
                <span className="font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="section-title">Top Crypto Exchanges</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {exchanges.map(({ name, icon }) => (
              <li
                key={name}
                className="flex items-center gap-3 bg-zinc-900 rounded-xl p-4 shadow-lg hover:bg-zinc-800 transition border border-zinc-800 neon-card"
              >
                <img
                  src={icon}
                  alt={`${name} icon`}
                  className="w-8 h-8 object-contain rounded bg-zinc-800 p-1"
                  loading="lazy"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
                <span className="font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12 max-w-xl mx-auto">
          <h2 className="section-title">Web-2 Broker & Gambling Withdraw & Deposit Guidelines</h2>
          <div className="bg-zinc-900 rounded-xl p-6 shadow-lg neon-card space-y-4 text-left border border-zinc-800">
            {guidelineItems.map(({ text, status }, idx) => (
              <p key={idx} className={`${statusColor[status]} flex items-center gap-2 text-base`}>
                {status === 'good' && '✅'}
                {status === 'bad' && '❌'}
                {status === 'warn' && '📌'}
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="section-title">Web-2 Gambling Sites</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {web2GamblingSites.map(site => (
              <li
                key={site}
                className="bg-zinc-900 rounded-lg py-3 px-4 text-center shadow hover:bg-zinc-800 cursor-default border border-zinc-800 neon-card"
              >
                {site}
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">Web-2 Brokers</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {web2Brokers.map(broker => (
              <li
                key={broker}
                className="bg-zinc-900 rounded-lg py-3 px-4 text-center shadow hover:bg-zinc-800 cursor-default border border-zinc-800 neon-card"
              >
                {broker}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default APKP;
