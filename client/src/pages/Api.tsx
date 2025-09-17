'use client'
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ApiPage() {
  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-black text-white px-4 py-10 relative overflow-hidden">
      {/* Hazy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0fffc3cc] via-[#00000088] to-[#000000ee] backdrop-blur-md pointer-events-none z-10"></div>
      
      {/* Coming Soon Text */}
      <div className="absolute top-[400px] left-1/2 transform -translate-x-1/2 z-30 flex justify-center w-full">
        <span className="text-3xl sm:text-4xl font-extrabold text-[#00ffe7] drop-shadow-lg tracking-wide animate-pulse opacity-100 text-center">
          Coming Soon
        </span>
      </div>

      <div className="relative z-20" style={{ opacity: 0.1 }}>
        <Navigation />

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Flash Coin API Access</h1>
          <p className="text-lg text-gray-300">
            Get fast, secure, and developer-friendly access to Flash Coin API. Easily integrate Flash transactions into your own platforms or apps.
          </p>
        </section>

        {/* API GET Usage */}
        <section className="bg-gray-900 rounded-xl p-6 mb-16 max-w-5xl mx-auto shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">📡 How to Use Flash Coin API</h2>
          <p className="text-sm text-gray-400 mb-4">Make a GET request to:</p>
          <div className="bg-gray-800 text-green-400 px-4 py-2 rounded text-sm font-mono mb-6">
            https://flashapi.io/api/flash/get?amount=100&currency=USDT&receiver=wallet_address
          </div>
          <p className="text-gray-300 text-sm">
            🔐 Make sure to include your <span className="font-semibold">API key</span> in headers: <br />
            <code className="bg-gray-800 p-1 rounded">Authorization: Bearer YOUR_API_KEY</code>
          </p>
        </section>

        {/* Pricing Section */}
        <section className="bg-gray-900 rounded-xl p-8 max-w-5xl mx-auto mb-20 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">💳 API Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-800 p-5 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Starter</h3>
              <p className="text-green-400 font-bold mb-2">$0 / month</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>✔ 500 requests/month</li>
                <li>✔ Basic support</li>
                <li>✔ Rate limited</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-5 rounded-lg shadow-md border border-yellow-500">
              <h3 className="font-bold text-xl mb-2">Pro</h3>
              <p className="text-yellow-400 font-bold mb-2">$29 / month</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>✔ 10,000 requests/month</li>
                <li>✔ Priority support</li>
                <li>✔ Fast endpoints</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-5 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Enterprise</h3>
              <p className="text-blue-400 font-bold mb-2">Custom</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>✔ Unlimited requests</li>
                <li>✔ Dedicated node</li>
                <li>✔ 24/7 SLA support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="text-center text-gray-500 text-sm mb-4">
          Need custom integration? <span className="text-green-400 underline cursor-pointer">Contact our team</span>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}