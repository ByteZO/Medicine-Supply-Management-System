import { useState } from "react";
import axios from "axios";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const API_URL =
  import.meta.env.BACKEND_API_URL || "http://localhost:8080/api/medicines";

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

      setIsSubmitted(true); // Show sucess card
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
    <div className={`bg-gray-900 min-h-screen flex items-center justify-center `}>
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-blue-600 rounded-3xl shadow-lg p-8 w-full max-w-lg text-center">
            <h2 className="text-4xl font-bold text-gray-200 mb-4">Success!</h2>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{
                color: "#46c34e",
                fontSize: "6rem",
                paddingBlock: "12px",
              }}
            />
            <p className="text-2xl font-medium mb-3 mt-3 text-gray-200">
              Medicine added successfully.
            </p>
          </div>
        </div>
      )}

      <div
        className={`bg-gray-900  px-8 pb-18 w-full max-w-6xl h-[75%] overflow-auto ${
          isSubmitted ? "blur-md" : ""
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">
          Add Medicine for Auditing
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
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
              className="custom-date-input"
              value={medicineData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded duration-200 hover:bg-blue-700 mt-6"
          >
            Submit
          </button>
        </form>
      </div>
      <script
        src="https://kit.fontawesome.com/de78888db2.js"
        crossorigin="anonymous"
      ></script>
    </div>
  );
}

import PropTypes from "prop-types";

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  step,
  className,
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-200 text-sm font-semibold mb-2"
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
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-900 border-gray-400 ${
          className || ""
        }`}
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
  className: PropTypes.string,
};

export default Auditing;
