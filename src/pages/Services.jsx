// src/pages/Services.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/authContext";

export default function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/account/services");
        setServices(res.data || []);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleToggleService = async (serviceId, active) => {
    try {
      if (active) {
        await API.post(`/account/services/remove/${serviceId}`);
        setServices((prev) =>
          prev.map((s) =>
            s.id === serviceId ? { ...s, status: "inactive" } : s
          )
        );
      } else {
        await API.post(`/account/services/add/${serviceId}`);
        setServices((prev) =>
          prev.map((s) =>
            s.id === serviceId ? { ...s, status: "active" } : s
          )
        );
      }
    } catch (err) {
      console.error("Failed to update service:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Services</h1>
      <p className="text-gray-600">
        Manage the services linked to your Kerliix account.
      </p>

      {/* Services List */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.length > 0 ? (
          services.map((s) => (
            <div
              key={s.id}
              className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-gray-600">{s.description}</p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    s.status === "active"
                      ? "text-green-600"
                      : s.status === "trial"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() =>
                    handleToggleService(s.id, s.status === "active")
                  }
                  className={`px-4 py-2 rounded-lg text-white ${
                    s.status === "active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {s.status === "active" ? "Remove" : "Activate"}
                </button>

                {/* Manage button */}
                <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                  Manage
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You don’t have any services yet.</p>
        )}
      </div>

      {/* Usage Analytics (placeholder) */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Usage Analytics</h2>
        <p className="text-gray-600">
          Coming soon: Track how you use Kerliix services.
        </p>
      </div>
    </div>
  );
}

          
