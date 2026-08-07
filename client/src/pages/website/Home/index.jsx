import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star, ShoppingBag, Zap } from 'lucide-react';
import ProductCard from '../../../components/cards/ProductCard';
import Spinner from '../../../components/loaders/Spinner';
import * as productService from '../../../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Skincare', 'Makeup', 'Hair Care', 'Fragrance'];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts(activeCategory === 'All' ? '' : activeCategory);
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching homepage products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [activeCategory]);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-gray-50 pt-12 pb-24 border-b border-rose-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100/80 text-rose-700 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Dermatologist Approved Cosmetics</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Unveil Your Natural <br />
              <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Radiant Glow
              </span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Formulated with clinical precision and organic botanicals. Discover our luxury skincare serums, vibrant velvet lipsticks, and enchanting fragrances.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <span>Shop Catalog Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products?category=Skincare"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-rose-50 text-gray-800 font-semibold rounded-full border border-rose-200 shadow-sm transition-all text-center"
              >
                Explore Skincare
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 border-t border-rose-100 flex items-center justify-center lg:justify-start gap-8">
              <div>
                <span className="font-serif text-2xl font-bold text-gray-900">50k+</span>
                <p className="text-xs text-gray-500 font-medium">Happy Customers</p>
              </div>
              <div className="h-8 w-px bg-rose-200" />
              <div>
                <span className="font-serif text-2xl font-bold text-gray-900">4.9/5</span>
                <p className="text-xs text-gray-500 font-medium">Top Rated Formulas</p>
              </div>
              <div className="h-8 w-px bg-rose-200" />
              <div>
                <span className="font-serif text-2xl font-bold text-gray-900">100%</span>
                <p className="text-xs text-gray-500 font-medium">Cruelty-Free</p>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="relative flex items-center justify-center">
            <div className="w-72 sm:w-96 aspect-[4/5] rounded-[2.5rem] bg-gradient-to-tr from-rose-300 to-amber-200 p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
                alt="GlowBeauty Vitamin C Serum"
                className="w-full h-full object-cover rounded-[2.2rem]"
              />
            </div>

            {/* Floating Glass Badges */}
            <div className="absolute top-10 -left-4 sm:left-4 glass-panel p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Vitamin C Serum</p>
                <p className="text-[10px] text-rose-600 font-semibold">#1 Bestseller</p>
              </div>
            </div>

            <div className="absolute -bottom-6 right-4 sm:right-10 glass-panel p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-rose-300 border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-amber-300 border-2 border-white" />
                <div className="w-7 h-7 rounded-full bg-pink-400 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <p className="text-[11px] font-bold text-gray-800">1,250+ 5-Star Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Explore Collections</h2>
            <p className="text-sm text-gray-500 mt-1">Curated products tailored for every beauty regimen</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Spinner text="Loading luxury cosmetic catalog..." />
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-gray-800">No products found</h3>
            <p className="text-gray-500 text-sm mt-1">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Luxury Brand Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-dark via-gray-900 to-rose-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left z-10">
            <span className="px-3.5 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-500/30">
              Exclusive Luxury Collection
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
              Elevate Your Daily Beauty Ritual
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Join our VIP loyalty reward program for complimentary shipping, custom skincare consultations, and instant access to new product drops.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-rose-950"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-72 aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"
              alt="Luxury Parfum"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
