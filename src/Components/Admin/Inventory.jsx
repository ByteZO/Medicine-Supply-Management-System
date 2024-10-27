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
    <div className="h-90 flex flex-col items-start px-8 py-6 bg-gray-100">
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-3xl font-semibold text-blue-600">Inventory</h1>

        {/* Filter Dropdown */}
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-medium">Filter:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Medicines</option>
            <option value="Expired">Expired Medicines</option>
          </select>
        </div>
      </div>

      {/* Medicine Table */}
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">Name</th>
              <th className="py-3 px-4 text-left text-gray-600">
                Manufacturer
              </th>
              <th className="py-3 px-4 text-left text-gray-600">Dosage</th>
              <th className="py-3 px-4 text-left text-gray-600">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-600">Price</th>
              <th className="py-3 px-4 text-left text-gray-600">Discount</th>
              <th className="py-3 px-4 text-left text-gray-600">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{medicine.name}</td>
                <td className="py-3 px-4">{medicine.manufacturer}</td>
                <td className="py-3 px-4">{medicine.dosage}</td>
                <td className="py-3 px-4">{medicine.quantity}</td>
                <td className="py-3 px-4">${medicine.price.toFixed(2)}</td>
                <td className="py-3 px-4">{medicine.discount}%</td>
                <td className="py-3 px-4">
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
