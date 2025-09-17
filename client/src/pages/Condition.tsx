import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16 text-black">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          🔒 Terms & Conditions (Flash Coin Orders)
        </h1>

        <ol className="space-y-4 list-decimal pl-6 text-gray-800">
          <li>
            <span className="font-semibold">New Orders Requirement:</span><br />
            If you have any pending orders, you must place a new order by strictly following the updated requirements.
          </li>

          <li>
            <span className="font-semibold">Wallet Usage Policy:</span><br />
            You must use a fresh wallet address (one that has never been used for real crypto transactions) when receiving Flash USDT.
            <br />
            <span className="text-sm italic text-gray-600">
              Note: Once received, you can transfer your Flash USDT to any other wallet of your choice.
            </span>
          </li>

          <li>
            <span className="font-semibold">Telegram Username Matching:</span><br />
            You must use the same Telegram username used in your previous orders. This ensures proper tracking and smooth order consolidation.
          </li>

          <li>
            <span className="font-semibold">Order Consolidation:</span><br />
            Following these guidelines ensures that all your Flash USDT from past and current orders are credited under one wallet/account.
          </li>
        </ol>

        <hr className="my-6 border-gray-300" />

        <p className="text-green-700 font-medium text-center text-lg">
          ✅ Thank you for choosing and trusting Flash Coin.<br />
          We appreciate your patience and cooperation!
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
