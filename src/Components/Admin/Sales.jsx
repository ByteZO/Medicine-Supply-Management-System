import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

const API_URL =
  import.meta.env.BACKEND_API_URL || "http://localhost:8080/api/medicines";

const Sales = () => {
  const sampleSalesData = [
    {
      createdDate: "2024-11-05T00:11:49",
      lastModifiedDate: "2024-11-05T00:11:49",
      id: 1,
      medicine: {
        createdDate: "2024-10-26T17:46:32",
        lastModifiedDate: "2024-11-05T00:11:50",
        id: 1,
        name: "Aspirin",
        manufacturer: "Pharma Co",
        genericName: "Acetylsalicylic Acid",
        dosage: "500mg",
        quantity: 91,
        price: 5.99,
        discount: 10.0,
        expiryDate: "2025-06-01",
      },
      quantity: 5,
      totalPrice: 50.0,
      saleDate: "2024-11-05T10:47:06Z",
    },
  ];

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    salesRecordHandler();
  }, []);

  const salesRecordHandler = async () => {
    try {
      const response = await axios.get(`${API_URL}/sold`);
      console.log("Sales Data:", response.data);
      setSalesData(response.data);
    } catch (error) {
      console.error(error);
      setSalesData(sampleSalesData);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Sales Report", 20, 20);

    // Set up table headers
    doc.setFontSize(12);
    const headers = [
      "ID",
      "Medicine",
      "Quantity",
      "Price",
      "Total Price",
      "Sale Date",
    ];
    const data = salesData.map((sale, index) => {
      const saleDate = new Date(sale.saleDate);
      const dateStr = saleDate.toLocaleDateString("en-IN", { timeZone: "UTC" });
      return [
        String(index + 1),
        sale.medicine.name,
        String(sale.quantity),
        `${sale.medicine.price.toFixed(2)}`,
        `${sale.totalPrice.toFixed(2)}`,
        dateStr,
      ];
    });

    // Add headers to PDF
    const colWidths = [10, 40, 20, 20, 30, 30];
    let x = 20;
    let y = 40; // Starting Y position for data

    // Add header row
    headers.forEach((header, index) => {
      doc.text(
        header,
        x + colWidths.slice(0, index).reduce((a, b) => a + b, 0),
        30
      );
    });

    // Draw data rows
    data.forEach((row) => {
      row.forEach((cell, index) => {
        doc.text(
          cell,
          x + colWidths.slice(0, index).reduce((a, b) => a + b, 0),
          y
        );
      });
      y += 10; // Space between rows
    });

    // Save the PDF with the format "Sales-Report {dd-mm-yy}"
    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, "0")}-${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${today.getFullYear().toString().slice(-2)}`;
    doc.save(`Sales-Report ${dateStr}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col items-start px-8 py-6 bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-6">Sales Report</h1>
      <div className="w-full bg-gray-800 shadow-md rounded-md overflow-hidden">
        <table className="min-w-full bg-gray-900">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-gray-300">ID</th>
              <th className="py-3 px-4 text-left text-gray-300">Medicine</th>
              <th className="py-3 px-4 text-left text-gray-300">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-300">Price</th>
              <th className="py-3 px-4 text-left text-gray-300">Total Price</th>
              <th className="py-3 px-4 text-left text-gray-300">Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => {
              const saleDate = new Date(sale.saleDate);
              const dateStr = saleDate.toLocaleDateString("en-IN", {
                timeZone: "UTC",
              });

              return (
                <tr
                  key={sale.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-300">
                    {sale.medicine.name}
                  </td>
                  <td className="py-3 px-4 text-gray-300">{sale.quantity}</td>
                  <td className="py-3 px-4 text-gray-300">
                    ₹{sale.medicine.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    ₹{sale.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-300">{dateStr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleDownload}
        className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Download Sales Report
      </button>
    </div>
  );
};

export default Sales;
