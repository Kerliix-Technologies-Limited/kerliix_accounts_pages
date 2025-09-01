// src/pages/Billing.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/authContext";

export default function Billing() {
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const resPlan = await API.get("/account/billing/plan");
        const resInvoices = await API.get("/account/billing/invoices");
        const resPayments = await API.get("/account/billing/payment-methods");

        setPlan(resPlan.data);
        setInvoices(resInvoices.data || []);
        setPaymentMethods(resPayments.data || []);
      } catch (err) {
        console.error("Failed to fetch billing data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, []);

  const handleAddPaymentMethod = async () => {
    alert("Open modal for adding payment method (to implement).");
  };

  const handleRemovePaymentMethod = async (methodId) => {
    try {
      await API.post(`/account/billing/payment-methods/remove/${methodId}`);
      setPaymentMethods((prev) => prev.filter((m) => m.id !== methodId));
    } catch (err) {
      console.error("Failed to remove payment method:", err);
    }
  };

  const handleUpgradePlan = async () => {
    alert("Redirect to plan upgrade flow (to implement).");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading billing info...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>
      <p className="text-gray-600">Manage your subscription and payments.</p>

      {/* Current Plan */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Current Plan</h2>
        {plan ? (
          <div>
            <p className="text-gray-700">
              {plan.name} —{" "}
              <span className="font-medium">
                {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Next billing date:{" "}
              {plan.nextBillingDate
                ? new Date(plan.nextBillingDate).toLocaleDateString()
                : "N/A"}
            </p>
            <button
              onClick={handleUpgradePlan}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Upgrade / Manage Plan
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No active subscription.</p>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
        {paymentMethods.length > 0 ? (
          <ul className="space-y-3">
            {paymentMethods.map((m) => (
              <li
                key={m.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-700">
                  {m.type} — **** {m.last4}
                </span>
                <button
                  onClick={() => handleRemovePaymentMethod(m.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No saved payment methods.</p>
        )}
        <button
          onClick={handleAddPaymentMethod}
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Add Payment Method
        </button>
      </div>

      {/* Invoices */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Invoices</h2>
        {invoices.length > 0 ? (
          <ul className="space-y-2">
            {invoices.map((inv) => (
              <li
                key={inv.id}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>
                  {new Date(inv.date).toLocaleDateString()} — {inv.amount}{" "}
                  {inv.currency}
                </span>
                <a
                  href={inv.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No invoices found.</p>
        )}
      </div>

      {/* Billing Alerts */}
      {plan?.alerts?.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
          <h2 className="font-semibold mb-2">Billing Alerts</h2>
          <ul className="list-disc list-inside">
            {plan.alerts.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

