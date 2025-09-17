// components/TrustedPartnersSection.jsx
import React from 'react';

const partners = [
  { name: 'Binance', logo: '/images/binance.png' },
  { name: 'Bybit', logo: '/images/bybit.png' },
  { name: 'KuCoin', logo: '/images/kucoin.png' },
  { name: 'Trust Wallet', logo: '/images/trustwallet.png' },
  { name: 'MetaMask', logo: '/images/metamask.png' },
];

const TrustedPartnersSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Trusted Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-16 object-contain mx-auto"
              />
              <p className="mt-2 text-sm">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartnersSection;
