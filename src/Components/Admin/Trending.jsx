import React, { useEffect, useState } from "react";
import axios from "axios";

const Trending = () => {
  const [trendingMedicines, setTrendingMedicines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch trending medicines data from the backend
    const fetchTrendingMedicines = async () => {
      try {
        const response = await axios.get("/api/medicines/trending"); // Adjust URL to match backend endpoint
        setTrendingMedicines([
          {
            createdDate: "2024-10-26T17:13:36",
            lastModifiedDate: "2024-10-26T17:13:36",
            id: 1,
            name: "Aspirin",
            manufacturer: "Pharma Co",
            genericName: "Acetylsalicylic Acid",
            dosage: "500mg",
            quantity: 100,
            price: 5.99,
            discount: 10,
            expiryDate: "2025-06-01",
          },
        ]);
      } catch (error) {
        setError("Failed to load trending medicines. Please try again later.");
        console.error("Error fetching trending medicines:", error);
      }
    };
    fetchTrendingMedicines();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-6 bg-gray-900">
      <h1 className="text-3xl font-semibold text-gray-200 mb-6">
        Trending Medicines
      </h1>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {trendingMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900">{medicine.name}</h2>
            <p className="text-gray-900 text-sm">
              Manufacturer: {medicine.manufacturer}
            </p>
            <p className="text-gray-900 text-sm">
              Generic Name: {medicine.genericName}
            </p>
            <p className="text-gray-900 text-sm">Dosage: {medicine.dosage}</p>
            <p className="text-gray-900 text-sm">
              Quantity: {medicine.quantity}
            </p>
            <p className="text-gray-900 text-sm">
              Price: ${medicine.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
