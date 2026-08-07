import React, { useState, useEffect } from "react";
import * as customerService from "../../../services/customerService";
import Spinner from "../../../components/loaders/Spinner";
import Modal from "../../../components/modals/Modal";
import {
  Eye,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  UserCheck,
} from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Customer Detail Modal State
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await customerService.getAllCustomers();
        setCustomers(data || []);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleViewDetails = async (customerId) => {
    try {
      setLoadingDetails(true);
      setIsModalOpen(true);
      const res = await customerService.getCustomerDetails(customerId);
      setSelectedCustomerData(res);
    } catch (err) {
      alert("Error fetching customer history.");
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Customer Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review registered store buyers and purchase histories
        </p>
      </div>

      {/* Customer List Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <Spinner text="Loading registered customers..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase border-b border-gray-100">
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-4">Email</th>
                  <th className="py-4 px-4">Phone</th>
                  <th className="py-4 px-4">Address</th>
                  <th className="py-4 px-6 text-right">Purchase History</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-gray-400 text-xs"
                    >
                      No registered customers yet.
                    </td>
                  </tr>
                ) : (
                  customers.map((cust) => (
                    <tr
                      key={cust._id}
                      className="hover:bg-rose-50/20 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                          {cust.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p>{cust.name}</p>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">
                            Registered Customer
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{cust.email}</td>
                      <td className="py-4 px-4 text-gray-600">
                        {cust.phone || "—"}
                      </td>
                      <td className="py-4 px-4 text-gray-600 max-w-xs truncate">
                        {cust.address || "—"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleViewDetails(cust._id)}
                          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-full transition-colors inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View History
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customer Profile"
      >
        {loadingDetails ? (
          <Spinner text="Fetching purchase history..." />
        ) : selectedCustomerData ? (
          <div className="space-y-6">
            {/* Profile Info Summary */}
            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-lg">
                <UserCheck className="w-5 h-5 text-rose-600" />
                {selectedCustomerData.customer.name}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-rose-200/40">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-rose-500" />{" "}
                  {selectedCustomerData.customer.email}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-rose-500" />{" "}
                  {selectedCustomerData.customer.phone || "N/A"}
                </p>
                <p className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />{" "}
                  {selectedCustomerData.customer.address || "N/A"}
                </p>
              </div>
            </div>

            {/* Orders Log */}
            <div>
              <h4 className="font-serif text-lg font-bold text-gray-900 mb-3">
                Purchase History (
                {selectedCustomerData.purchaseHistory?.length || 0} Orders)
              </h4>

              {selectedCustomerData.purchaseHistory?.length === 0 ? (
                <p className="text-xs text-gray-400 py-4">
                  No purchases recorded for this customer yet.
                </p>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {selectedCustomerData.purchaseHistory.map((order) => (
                    <div
                      key={order._id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-gray-800">
                          Order #{order._id.substring(order._id.length - 8)}
                        </span>
                        <span className="font-bold text-rose-600">
                          ৳{order.totalPrice?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span>
                          Status:{" "}
                          <strong className="text-gray-800">
                            {order.status}
                          </strong>
                        </span>
                        <span>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Customers;
