import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.BACKEND_API_URL || "http://localhost:8080/api/medicines";

const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [filter, setFilter] = useState("All"); // Default filter to show all medicines

  // Function to fetch medicines based on the selected filter
  const fetchMedicines = async (filter) => {
    try {
      const url = filter === "All" ? API_URL : `${API_URL}/expired`;
      console.log(`Calling API: ${url}`); // Log API call for debugging
      const response = await axios.get(url);
      console.log("API Response:", response.data); // Log response for debugging
      setMedicines(response.data);
    } catch (error) {
      setMedicines([]);
      alert("Something went wrong. Please try again later.");
      console.error("Error fetching medicines:", error);
    }
  };

  // Fetch data initially and whenever the filter changes
  useEffect(() => {
    fetchMedicines(filter);
  }, [filter]); // Dependency array includes 'filter' to re-trigger API calls

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
            {medicines.map((medicine) => (
              <tr key={medicine.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{medicine.name}</td>
                <td className="py-3 px-4">{medicine.manufacturer}</td>
                <td className="py-3 px-4">{medicine.dosage}</td>
                <td className="py-3 px-4">{medicine.quantity}</td>
                <td className="py-3 px-4">₹{medicine.price.toFixed(2)}</td>
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
