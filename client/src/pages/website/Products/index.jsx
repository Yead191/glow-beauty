import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, ShoppingBag } from 'lucide-react';
import ProductCard from '../../../components/cards/ProductCard';
import Spinner from '../../../components/loaders/Spinner';
import * as productService from '../../../services/productService';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Skincare', 'Makeup', 'Hair Care', 'Fragrance'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts(
          selectedCategory === 'All' ? '' : selectedCategory,
          searchQuery
        );
        setProducts(data || []);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-50 to-amber-50 rounded-3xl p-8 sm:p-12 border border-rose-100">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          Our Full Cosmetic Catalog
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
          Browse our dermatologist-approved skincare formulations, vibrant lipsticks, mascaras, primers, and signature fragrances.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-rose-500 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-rose-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Showing {products.length} {products.length === 1 ? 'Product' : 'Products'}
          </p>
        </div>

        {loading ? (
          <Spinner text="Searching cosmetics catalog..." />
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-gray-800">No products matched your search</h3>
            <p className="text-gray-500 text-sm mt-2">Try clearing filters or searching for different keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-rose-600 text-white text-sm font-semibold rounded-full hover:bg-rose-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Products;
