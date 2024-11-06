import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const API_URL =
  import.meta.env.BACKEND_API_URL || "http://localhost:8080/api/medicines";
const EXPIRED_API_URL = `${API_URL}/expired`;

const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to fetch medicines based on filter
  const fetchMedicines = async () => {
    try {
      const response =
        filter === "Expired"
          ? await axios.get(EXPIRED_API_URL)
          : await axios.get(API_URL);
      setMedicines(response.data);
      applyFilters(response.data, searchQuery);
    } catch (error) {
      setMedicines([]);
      setFilteredMedicines([]);
      alert("Something went wrong. Please try again later.");
      console.error("Error fetching medicines:", error);
    }
  };

  // Function to apply search term
  const applyFilters = (data, searchValue) => {
    let results = data;

    if (searchValue) {
      results = results.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredMedicines(results);
  };

  // Fetch medicines initially and on filter change
  useEffect(() => {
    fetchMedicines();
  }, [filter]);

  // Re-apply filters when medicines data or search query changes
  useEffect(() => {
    applyFilters(medicines, searchQuery);
  }, [medicines, searchQuery]);

  // Search handler triggered by Search button
  const handleSearch = async () => {
    setSearchQuery(searchTerm);
    applyFilters(medicines, searchTerm);
    console.log("Searching for:", searchTerm);

    const res = await axios.get(`${API_URL}/search?name=${searchTerm}`);
    console.log("Search Results:", res.data);
  };

  // Clear search term handler
  const handleClear = () => {
    setSearchTerm("");
    setSearchQuery("");
    applyFilters(medicines, "");
  };

  // Checkout button handler
  const handleCheckout = (medicine) => {
    setSelectedMedicine(medicine);
    setQuantity("");
  };

  // Confirm sale handler
  const handleConfirmSale = async () => {
    if (!quantity || quantity <= 0 || quantity > selectedMedicine.quantity) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/sell`, {
        medicineId: selectedMedicine.id,
        quantity,
      });

      console.log("Sale confirmed:", res.data);
      setTotalPrice(res.data.totalPrice);
      setSuccessMessage(true);
      setTimeout(() => {
        setSelectedMedicine(null);
        setSuccessMessage(false);
        fetchMedicines(); // Refresh inventory list
      }, 1000);
    } catch (error) {
      console.error("Error confirming sale:", error);
      alert("Failed to confirm sale. Please try again.");
    }
  };

  // Close Checkout overlay
  const handleCancelCheckout = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="h-screen flex flex-col items-start px-8 py-6 bg-gray-900">
      <div className={`${selectedMedicine ? "blur-sm" : ""} w-full`}>
        <div className="flex items-center justify-between w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-200">Inventory</h1>

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

            <div className="relative">
              <input
                type="text"
                placeholder="Search by name"
                className="border border-gray-600 rounded px-3 py-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-600 pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="absolute inset-y-0 right-2 text-gray-300 hover:text-red-500 focus:outline-none"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              Search
            </button>
          </div>
        </div>

        {/* Table of Medicines */}
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
                {/* Only display Expiry Date column if not in Expired filter */}
                {filter !== "Expired" && (
                  <th className="py-3 px-4 text-left text-gray-300">
                    Expiry Date
                  </th>
                )}
                {/* Only display Actions column if not in Expired filter */}
                {filter !== "Expired" && (
                  <th className="py-3 px-4 text-left text-gray-300">Actions</th>
                )}
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
                  <td className="py-3 px-4 text-gray-300">
                    {medicine.quantity}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    ₹{medicine.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {medicine.discount}%
                  </td>
                  {filter !== "Expired" && (
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(medicine.expiryDate).toLocaleDateString()}
                    </td>
                  )}
                  {filter !== "Expired" && (
                    <td className="py-3 px-4 text-gray-300">
                      <button
                        onClick={() => handleCheckout(medicine)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none"
                      >
                        Checkout
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Component */}
      {selectedMedicine && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          {/* Checkout logic here */}
          {selectedMedicine && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                {/* Cross (Cancel) button */}
                {!successMessage ? (
                  <button
                    onClick={handleCancelCheckout}
                    className="absolute top-3 right-3 text-gray-300 hover:text-red-500 text-xl focus:outline-none"
                  >
                    ✕
                  </button>
                ) : null}
                {successMessage ? (
                  <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="bg-blue-600 rounded-3xl shadow-lg p-8 w-full max-w-lg text-center">
                      <h2 className="text-4xl font-bold text-gray-200 mb-4">
                        Success!
                      </h2>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{
                          color: "#46c34e",
                          fontSize: "6rem",
                          paddingBlock: "12px",
                        }}
                      />
                      <p className="text-2xl font-medium mb-3 mt-3 text-gray-200">
                        Medicine Sold successfully.
                      </p>
                      <p className="text-2xl font-medium mb-3 mt-3 text-gray-200">
                        Total Price: ₹{totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">
                      Checkout: {selectedMedicine.name}
                    </h2>
                    <p className="mb-2 text-gray-400">
                      Available quantity: {selectedMedicine.quantity}
                    </p>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 mb-4 text-gray-300 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-600"
                    />
                    <button
                      onClick={handleConfirmSale}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                    >
                      Confirm Sale
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Inventory;
