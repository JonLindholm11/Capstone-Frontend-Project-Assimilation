import { useState } from "react";

export default function SalesPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white">
      {/* Z-Pattern 1: Left to Right */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Transform Your Business</h1>
            <p className="text-gray-600 mb-6">
              The solution trusted by thousands
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Get Started
            </button>
          </div>
          <div className="bg-gray-200 h-64 rounded"></div>
        </div>
      </div>

      {/* Z-Pattern 2: Right to Left */}
      <div className="bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gray-300 h-64 rounded order-2 md:order-1"></div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4">Fast & Reliable</h2>
            <p className="text-gray-600 mb-4">Get started in minutes</p>
            <ul className="space-y-2">
              <li>✓ Quick setup</li>
              <li>✓ 99.9% uptime</li>
              <li>✓ Secure</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Z-Pattern 3: Left to Right */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <ul className="space-y-2">
              <li>✓ Analytics</li>
              <li>✓ 24/7 Support</li>
            </ul>
          </div>
          <div className="bg-gray-200 h-64 rounded"></div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-4">$</p>
              <ul className="space-y-2 mb-6">
                <li>• 5 users</li>
                <li>• Basic features</li>
              </ul>
              <button className="w-full bg-gray-900 text-white py-2 rounded">
                Choose
              </button>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">$</p>
              <ul className="space-y-2 mb-6">
                <li>• 20 users</li>
                <li>• All features</li>
              </ul>
              <button className="w-full bg-white text-blue-600 py-2 rounded">
                Choose
              </button>
            </div>
            <div className="bg-white p-6 rounded">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">$1</p>
              <ul className="space-y-2 mb-6">
                <li>• Unlimited</li>
                <li>• Custom features</li>
              </ul>
              <button className="w-full bg-gray-900 text-white py-2 rounded">
                Choose
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 px-4 py-2 border rounded"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white p-4 text-center">
        <p>© 2025 YourCompany</p>
      </div>
    </div>
  )
};
