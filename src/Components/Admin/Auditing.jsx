import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auditing() {
  const [medicineData, setMedicineData] = useState({
    name: "",
    manufacturer: "",
    genericName: "",
    dosage: "",
    quantity: "",
    price: "",
    discount: "",
    expiryDate: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Uncomment the line below to enable the API call
      // await axios.post("http://localhost:5000/api/auditing", medicineData);
      
      setIsSubmitted(true); // Show success card
      setMedicineData({ // Clear form fields
        name: "",
        manufacturer: "",
        genericName: "",
        dosage: "",
        quantity: "",
        price: "",
        discount: "",
        expiryDate: "",
      });

      setTimeout(() => {
        setIsSubmitted(false); // Hide success card after 1.5 seconds
      }, 1500);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="bg-gray-100 h-[90vh] flex items-center justify-center">
      {/* Success Message */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Success!</h2>
            <p className="text-lg mb-6">Medicine added successfully.</p>
          </div>
        </div>
      )}

      {/* Form for Medicine Data */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl h-[80%] overflow-auto">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Add Medicine for Auditing
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Enter medicine name"
                value={medicineData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturer">
                Manufacturer
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="manufacturer"
                name="manufacturer"
                type="text"
                placeholder="Enter manufacturer"
                value={medicineData.manufacturer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genericName">
                Generic Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="genericName"
                name="genericName"
                type="text"
                placeholder="Enter generic name"
                value={medicineData.genericName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dosage">
                Dosage
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dosage"
                name="dosage"
                type="text"
                placeholder="Enter dosage (e.g., 500mg)"
                value={medicineData.dosage}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                value={medicineData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                value={medicineData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
                Discount (%)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="discount"
                name="discount"
                type="number"
                placeholder="Enter discount"
                value={medicineData.discount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                Expiry Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={medicineData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auditing;
