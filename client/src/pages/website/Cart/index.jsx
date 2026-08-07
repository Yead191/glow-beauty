import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import Spinner from "../../../components/loaders/Spinner";

const Cart = () => {
  const {
    cart,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <Spinner text="Fetching your shopping bag..." />;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
          Explore our collection of luxurious skincare, cosmetics, and
          fragrances to add beauty items to your cart.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105"
        >
          Explore Catalog Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Your Shopping Bag
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {totalCount} items ready for checkout
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 hover:underline"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div
                key={item._id}
                className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-2xl bg-rose-50 border border-gray-100 shrink-0"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-base mt-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ৳{product.price?.toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= product.stock}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <span className="font-serif font-bold text-lg text-gray-900 block">
                      ৳{(product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm h-fit space-y-6">
          <h3 className="font-serif text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items Total ({totalCount})</span>
              <span className="font-semibold text-gray-900">
                ৳{totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping (Standard)</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-semibold text-gray-900">৳0.00</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="font-serif text-lg font-bold text-gray-900">
                Total Price
              </span>
              <span className="font-serif text-2xl font-bold text-rose-600">
                ৳{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed Safe & Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
