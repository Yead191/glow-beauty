import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  ArrowLeft,
  Truck,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import Spinner from "../../../components/loaders/Spinner";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import * as productService from "../../../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, quantity);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    } catch (err) {
      alert("Failed to add item to cart");
    }
  };

  if (loading) {
    return <Spinner text="Loading product details..." />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-gray-800">
          Product Not Found
        </h2>
        <Link
          to="/products"
          className="mt-4 inline-block px-6 py-2.5 bg-rose-600 text-white rounded-full text-sm font-semibold"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-rose-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Products
      </Link>

      <div className="bg-white rounded-3xl border border-rose-100/60 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-rose-50/50 border border-gray-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800";
            }}
          />
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-rose-700 shadow-sm uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="font-bold text-gray-800">4.9 / 5.0</span>
              <span className="text-gray-400 text-xs">
                (184 Verified Reviews)
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center justify-between border-y border-gray-100 py-4">
            <div>
              <span className="text-xs text-gray-400 block font-semibold uppercase">
                Price
              </span>
              <span className="font-serif text-3xl font-bold text-gray-900">
                ৳{product.price?.toFixed(2)}
              </span>
            </div>

            <div>
              <span className="text-xs text-gray-400 block font-semibold uppercase">
                Availability
              </span>
              {isOutOfStock ? (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              ) : (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  In Stock ({product.stock} units available)
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Cart Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Quantity
              </label>
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-50 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-50 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                  addedSuccess
                    ? "bg-emerald-600 text-white"
                    : isOutOfStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 hover:scale-[1.02]"
                }`}
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Added to Shopping Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    {isOutOfStock
                      ? "Sold Out"
                      : `Add ${quantity} to Bag (৳${(product.price * quantity).toFixed(2)})`}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Guarantee Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-rose-500" />
              <span>Ships within 24 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span>Dermatologist Formulated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
