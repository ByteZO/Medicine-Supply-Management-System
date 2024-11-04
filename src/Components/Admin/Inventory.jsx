import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.BACKEND_API_URL || "http://localhost:8080/api/medicines";

const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch medicines
  const fetchMedicines = async () => {
    try {
      const mockMedicines = [
        {
          id: "1",
          name: "Paracetamol",
          manufacturer: "ABC Pharmaceuticals",
          dosage: "500mg",
          quantity: 100,
          price: 1.5,
          discount: 5,
          expiryDate: "2025-01-15",
        },
        {
          id: "2",
          name: "Ibuprofen",
          manufacturer: "XYZ Pharma",
          dosage: "200mg",
          quantity: 200,
          price: 0.75,
          discount: 10,
          expiryDate: "2024-08-10",
        },
        {
          id: "3",
          name: "Aspirin",
          manufacturer: "HealthCorp",
          dosage: "300mg",
          quantity: 50,
          price: 0.65,
          discount: 0,
          expiryDate: "2025-07-22",
        },
        {
          id: "4",
          name: "Amoxicillin",
          manufacturer: "MediQuick",
          dosage: "250mg",
          quantity: 150,
          price: 2.25,
          discount: 15,
          expiryDate: "2023-11-05",
        },
        {
          id: "5",
          name: "Ciprofloxacin",
          manufacturer: "Wellness Labs",
          dosage: "500mg",
          quantity: 120,
          price: 1.8,
          discount: 20,
          expiryDate: "2024-12-31",
        },
      ];
      // await axios.post(API_URL, mockMedicines);q
      <q></q>
      setMedicines(mockMedicines);
      applyFilters(mockMedicines, searchQuery);
    } catch (error) {
      setMedicines([]);
      setFilteredMedicines([]);
      alert("Something went wrong. Please try again later.");
      console.error("Error fetching medicines:", error);
    }
  };

  // Function to apply filter and search term together
  const applyFilters = (data, searchValue) => {
    const today = new Date();
    let results = data;

    if (filter === "Expired") {
      results = results.filter(
        (medicine) => new Date(medicine.expiryDate) < today
      );
    }

    if (searchValue) {
      results = results.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredMedicines(results);
  };

  // Call `fetchMedicines` initially
  useEffect(() => {
    fetchMedicines();
  }, []);

  // Re-apply filters only when the filter option changes
  useEffect(() => {
    applyFilters(medicines, searchQuery);
  }, [filter, medicines]);

  // Search handler triggered by Search button
  const handleSearch = async () => {
    setSearchQuery(searchTerm); // Update search query only when Search button is clicked
    applyFilters(medicines, searchTerm);
    // await axios.post(API_URL, searchQuery); // Make API call with search query
  };

  // Clear (Cross) button handler
  const handleClear = () => {
    setSearchTerm("");
    setSearchQuery(""); // Reset search query when Clear is clicked
    applyFilters(medicines, "");
  };

  return (
    <div className="h-screen flex flex-col items-start px-8 py-6 bg-gray-900">
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-3xl font-semibold text-gray-200">Inventory</h1>

        {/* Filter, Search Input, Search Button */}
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

          {/* Search Input with Cross Button Inside */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-600 rounded px-3 py-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-600 pr-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Cross Button */}
            {searchTerm && (
              <button
                onClick={handleClear}
                className="absolute inset-y-0 right-2 text-gray-300 hover:text-red-500 focus:outline-none"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>

      {/* Medicine Table */}
      <div className="w-full bg-gray-800 shadow-md rounded-md overflow-hidden">
        <table className="min-w-full bg-gray-900">
          <thead className="bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left text-gray-300">Name</th>
              <th className="py-3 px-4 text-left text-gray-300">
                Manufacturer
              </th>
              <th className="py-3 px-4 text-left text-gray-300">Dosage</th>
              <th className="py-3 px-4 text-left text-gray-300">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-300">Price</th>
              <th className="py-3 px-4 text-left text-gray-300">Discount</th>
              <th className="py-3 px-4 text-left text-gray-300">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr
                key={medicine.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="py-3 px-4 text-gray-300">{medicine.name}</td>
                <td className="py-3 px-4 text-gray-300">
                  {medicine.manufacturer}
                </td>
                <td className="py-3 px-4 text-gray-300">{medicine.dosage}</td>
                <td className="py-3 px-4 text-gray-300">{medicine.quantity}</td>
                <td className="py-3 px-4 text-gray-300">
                  ${medicine.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-gray-300">
                  {medicine.discount}%
                </td>
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
