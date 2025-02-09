import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center mb-12">
          Subscription Plans
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Basic</h2>
            <p className="text-4xl font-bold mb-6">
              $9.99<span className="text-sm">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li>✓ HD Streaming</li>
              <li>✓ Watch on 1 Device</li>
              <li>✓ Cancel Anytime</li>
            </ul>
            <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
              Choose Plan
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-blue-600 p-8 rounded-lg transform scale-105">
            <h2 className="text-2xl font-bold mb-4">Standard</h2>
            <p className="text-4xl font-bold mb-6">
              $14.99<span className="text-sm">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li>✓ Full HD Streaming</li>
              <li>✓ Watch on 2 Devices</li>
              <li>✓ Download Available</li>
              <li>✓ Cancel Anytime</li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-gray-100">
              Choose Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <p className="text-4xl font-bold mb-6">
              $19.99<span className="text-sm">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li>✓ 4K + HDR Streaming</li>
              <li>✓ Watch on 4 Devices</li>
              <li>✓ Download Available</li>
              <li>✓ Exclusive Content</li>
              <li>✓ Cancel Anytime</li>
            </ul>
            <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
