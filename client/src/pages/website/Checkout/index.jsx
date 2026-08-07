import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import * as orderService from "../../../services/orderService";
import {
  Truck,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Phone,
  CreditCard,
} from "lucide-react";
import Spinner from "../../../components/loaders/Spinner";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Cash On Delivery
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-gray-800">
          No items in cart for checkout
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-6 py-2.5 bg-rose-600 text-white font-semibold text-sm rounded-full"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      setError("Shipping Address is required");
      return;
    }
    if (!phone.trim()) {
      setError("Phone Number is required");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await orderService.createOrder({
        shippingAddress,
        phone,
      });
      await clearCart();
      navigate("/my-orders");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Checkout & Order Placement
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review shipping details and confirm Cash On Delivery order
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm border border-red-200">
          {error}
        </div>
      )}

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* Left Column: Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <MapPin className="w-5 h-5 text-rose-500" />
              <h3 className="font-serif text-xl font-bold text-gray-900">
                1. Shipping Address
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Full Shipping Address *
                </label>
                <textarea
                  rows={3}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street address, Apartment/Suite, City, State, ZIP code"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Contact Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <CreditCard className="w-5 h-5 text-rose-500" />
              <h3 className="font-serif text-xl font-bold text-gray-900">
                2. Payment Method
              </h3>
            </div>

            <div className="p-4 rounded-2xl border-2 border-rose-500 bg-rose-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-4 border-rose-600 bg-white" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">
                    Cash On Delivery (COD)
                  </h4>
                  <p className="text-xs text-gray-500">
                    Pay in cash when courier arrives at your door
                  </p>
                </div>
              </div>
              <Truck className="w-6 h-6 text-rose-600" />
            </div>
          </div>
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm h-fit space-y-6">
          <h3 className="font-serif text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">
            Order Review
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => {
              const product = item.productId;
              if (!product) return null;
              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 max-w-[180px] truncate">
                    <span className="font-bold text-rose-600">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-800 font-medium truncate">
                      {product.name}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ৳{(product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                ৳{totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="font-serif text-lg font-bold text-gray-900">
                Total Payable
              </span>
              <span className="font-serif text-2xl font-bold text-rose-600">
                ৳{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <Spinner size="sm" text="Placing Order..." />
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Confirm & Place Order
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Order backed by 30-day return policy</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
