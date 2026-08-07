import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t border-rose-900/30">
      {/* Feature Highlights Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">
                Free Express Shipping
              </h4>
              <p className="text-xs text-gray-400">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">
                100% Authentic Products
              </h4>
              <p className="text-xs text-gray-400">Dermatologist Tested</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">
                30-Day Money Back
              </h4>
              <p className="text-xs text-gray-400">Easy, hassle-free returns</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">
                24/7 Dedicated CRM Support
              </h4>
              <p className="text-xs text-gray-400">Fast ticket resolution</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-rose-300 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              GlowBeauty
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Elevating your beauty experience with clean, dermatologist-backed
            formulas and vibrant luxury cosmetics.
          </p>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h4 className="font-serif text-lg font-bold text-white mb-4">
            Categories
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <Link
                to="/products?category=Skincare"
                className="hover:text-rose-400 transition-colors"
              >
                Skincare
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Makeup"
                className="hover:text-rose-400 transition-colors"
              >
                Makeup
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Hair Care"
                className="hover:text-rose-400 transition-colors"
              >
                Hair Care
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Fragrance"
                className="hover:text-rose-400 transition-colors"
              >
                Fragrance
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div>
          <h4 className="font-serif text-lg font-bold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <Link
                to="/products"
                className="hover:text-rose-400 transition-colors"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-rose-400 transition-colors"
              >
                My Cart
              </Link>
            </li>
            <li>
              <Link
                to="/my-orders"
                className="hover:text-rose-400 transition-colors"
              >
                Order Tracking
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-rose-400 transition-colors"
              >
                Customer Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div>
          <h4 className="font-serif text-lg font-bold text-white mb-4">
            Join Glow Club
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to receive exclusive beauty offers, skincare tips, and
            product releases.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 border border-white/10"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm rounded-xl transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          &copy; {new Date().getFullYear()} GlowBeauty Cosmetics Inc. All rights
          reserved.
        </p>
        <p className="flex items-center justify-center gap-1">
          Developed by Fatema Zarin Borsha{" "}
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
