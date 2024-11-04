import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { medicine } = location.state || {}; // Access medicine details from state
  const [quantity, setQuantity] = useState("");

  const handleSell = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/sell", {
        medicineId: medicine.id,
        quantity: parseInt(quantity, 10),
      });
      alert("Medicine sold successfully!");
      navigate("/"); // Redirect back to inventory
    } catch (error) {
      alert("Error selling medicine. Please try again.");
      console.error(error);
    }
  };

  if (!medicine) {
    return <div className="text-white">No medicine selected.</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-semibold mb-4">Sell Medicine</h1>
      <div className="bg-gray-800 p-6 rounded-md shadow-md w-80">
        <p>
          <strong>Name:</strong> {medicine.name}
        </p>
        <p>
          <strong>Manufacturer:</strong> {medicine.manufacturer}
        </p>
        <p>
          <strong>Dosage:</strong> {medicine.dosage}
        </p>
        <p>
          <strong>Available Quantity:</strong> {medicine.quantity}
        </p>
        <p>
          <strong>Price per Unit:</strong> ₹{medicine.price.toFixed(2)}
        </p>
        <p>
          <strong>Discount:</strong> {medicine.discount}%
        </p>
        <p>
          <strong>Expiry Date:</strong>{" "}
          {new Date(medicine.expiryDate).toLocaleDateString()}
        </p>

        <input
          type="number"
          min="1"
          max={medicine.quantity}
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-gray-600 rounded px-3 py-1 bg-gray-700 text-white w-full mt-4 focus:outline-none focus:border-blue-600"
        />

        <button
          onClick={handleSell}
          className="w-full mt-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          disabled={!quantity || quantity > medicine.quantity}
        >
          Sell Medicine
        </button>
      </div>
    </div>
  );
};

export default Checkout;
