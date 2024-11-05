import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL =
  import.meta.env.BACKEND_TRENDING_API_URL ||
  "http://localhost:8080/api/trending-medicines";

const Trending = () => {
  const [trendingMedicines, setTrendingMedicines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMedicines = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("Trending Medicines:", response.data);

        setTrendingMedicines(response.data);
      } catch (error) {
        setError("Failed to load trending medicines. Please try again later.");
        console.error("Error fetching trending medicines:", error);
      }
    };
    fetchTrendingMedicines();
  }, []);

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-6 bg-gray-900">
      <h1 className="text-3xl font-semibold text-gray-200 mb-6">
        Trending Medicines
      </h1>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {trendingMedicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-blue-100 rounded-lg shadow-sm overflow-hidden transform transition duration-300 hover:scale-105 flex"
            style={cardStyle}
          >
            {/* Right side with the details */}
            <div className="p-6 w-full">
              <h2 className="text-2xl font-bold text-white mb-2">
                {medicine.name.toUpperCase()}
              </h2>
              <p className="text-gray-700 text-md mb-1">
                <span className="font-semibold text-blue-200">Quantity:</span>{" "}
                <span className="text-white">{medicine.quantity}</span>
              </p>
              <p className="text-gray-700 text-md mb-1">
                <span className="font-semibold text-blue-200">Date:</span>{" "}
                <span className="text-white">{medicine.date}</span>
              </p>
              <p className="text-gray-700 text-md mb-1">
                <span className="font-semibold text-blue-200">Created:</span>{" "}
                <span className="text-white">{medicine.createdDate}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
