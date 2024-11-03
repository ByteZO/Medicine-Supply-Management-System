import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [filter, setFilter] = useState("All"); // Default to show all medicines

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/medicines"); // Adjust URL to match backend endpoint
        setMedicines([
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
        setMedicines([]);
        alert("Something went wrong . Please try again later.");
        console.error("Error fetching medicines:", error);
      }
    };
    fetchData();
  }, []);

  // Filter function to show either all medicines or only expired ones
  const filteredMedicines = medicines.filter((medicine) => {
    if (filter === "All") return true;
    if (filter === "Expired") return new Date(medicine.expiryDate) < new Date();
    return false;
  });

  return (
    <div className="h-screen flex flex-col items-start px-8 py-6 bg-gray-900">
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-3xl font-semibold text-gray-200">Inventory</h1>

        {/* Filter Dropdown */}
        <div className="flex items-center space-x-4">
          <label className="text-gray-300 font-medium">Filter:</label>
          <select
            className="border border-gray-600 rounded px-3 py-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Medicines</option>
            <option value="Expired">Expired Medicines</option>
          </select>
        </div>
      </div>

      {/* Medicine Table */}
      <div className="w-full bg-gray-800 shadow-md rounded-md overflow-hidden">
        <table className="min-w-full bg-gray-900">
          <thead className="bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left text-gray-300">Name</th>
              <th className="py-3 px-4 text-left text-gray-300">Manufacturer</th>
              <th className="py-3 px-4 text-left text-gray-300">Dosage</th>
              <th className="py-3 px-4 text-left text-gray-300">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-300">Price</th>
              <th className="py-3 px-4 text-left text-gray-300">Discount</th>
              <th className="py-3 px-4 text-left text-gray-300">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-3 px-4 text-gray-300">{medicine.name}</td>
                <td className="py-3 px-4 text-gray-300">{medicine.manufacturer}</td>
                <td className="py-3 px-4 text-gray-300">{medicine.dosage}</td>
                <td className="py-3 px-4 text-gray-300">{medicine.quantity}</td>
                <td className="py-3 px-4 text-gray-300">${medicine.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-gray-300">{medicine.discount}%</td>
                <td className="py-3 px-4 text-gray-300">
                  {new Date(medicine.expiryDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Inventory;
