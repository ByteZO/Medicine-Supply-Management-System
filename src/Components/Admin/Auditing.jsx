import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.BACKEND_API_URL || "http://localhost:8080/api/medicines"; // Default API URL

function Auditing() {
  const [medicineData, setMedicineData] = useState({
    name: "",
    manufacturer: "",
    genericName: "",
    dosage: "",
    quantity: "",
    price: "",
    discount: "",
    expiryDate: "", // Single expiry date field for API
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the request payload to verify
      console.log("Submitting Data:", medicineData);

      const response = await axios.post(API_URL, medicineData);
      console.log("Response:", response.data); // Log response from API

      setIsSubmitted(true); // Show success card
      setMedicineData({
        name: "",
        manufacturer: "",
        genericName: "",
        dosage: "",
        quantity: "",
        price: "",
        discount: "",
        expiryDate: "", // Reset after submission
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 1500);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="bg-gray-100 h-[90vh] flex items-center justify-center">
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Success!</h2>
            <p className="text-lg mb-6">Medicine added successfully.</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl h-[80%] overflow-auto">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Add Medicine for Auditing
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Medicine Details */}
            <InputField
              label="Name"
              name="name"
              value={medicineData.name}
              onChange={handleChange}
            />
            <InputField
              label="Manufacturer"
              name="manufacturer"
              value={medicineData.manufacturer}
              onChange={handleChange}
            />
            <InputField
              label="Generic Name"
              name="genericName"
              value={medicineData.genericName}
              onChange={handleChange}
            />
            <InputField
              label="Dosage"
              name="dosage"
              value={medicineData.dosage}
              onChange={handleChange}
            />
            <InputField
              label="Quantity"
              name="quantity"
              type="number"
              value={medicineData.quantity}
              onChange={handleChange}
            />
            <InputField
              label="Price"
              name="price"
              type="number"
              step="0.01"
              value={medicineData.price}
              onChange={handleChange}
            />
            <InputField
              label="Discount (%)"
              name="discount"
              type="number"
              value={medicineData.discount}
              onChange={handleChange}
            />
            <InputField
              label="Expiry Date"
              name="expiryDate"
              type="date"
              value={medicineData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-6"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";

function InputField({ label, name, value, onChange, type = "text", step }) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        step={step}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        required
      />
    </div>
  );
}
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  step: PropTypes.string,
};

export default Auditing;
