import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      await addToCart(product._id, 1);
    } catch (err) {
      alert("Failed to add product to cart.");
    }
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-rose-100/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-square overflow-hidden bg-rose-50/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800";
            }}
          />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-rose-700 shadow-sm">
            {product.category}
          </span>

          {/* Stock Badges */}
          {isOutOfStock ? (
            <span className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm animate-pulse">
              Only {product.stock} Left
            </span>
          ) : null}

          {/* Overlay Quick View Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Link
              to={`/products/${product._id}`}
              className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110"
              title="View Details"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Info Content */}
        <div className="p-5">
          <div className="flex items-center gap-1 text-amber-400 text-xs mb-1 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>4.9</span>
            <span className="text-gray-400 font-normal ml-1">
              (120+ reviews)
            </span>
          </div>

          <Link to={`/products/${product._id}`}>
            <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1 text-base">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 min-h-[32px]">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="p-5 pt-0 flex items-center justify-between mt-2">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Price</span>
          <span className="font-serif text-xl font-bold text-gray-900">
            ৳{product.price?.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${
            isOutOfStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-rose-600 hover:bg-rose-700 text-white hover:shadow-md hover:shadow-rose-200 hover:scale-105 active:scale-95"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {isOutOfStock ? "Sold Out" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
