import React from "react";
import { jsPDF } from "jspdf";

// Sample sales data
const salesData = [
  {
    id: 1,
    name: "Aspirin",
    quantity: 50,
    price: 5.99,
    saleDate: "2024-10-01T10:00:00",
  },
  {
    id: 2,
    name: "Ibuprofen",
    quantity: 30,
    price: 8.49,
    saleDate: "2024-10-05T14:30:00",
  },
  {
    id: 3,
    name: "Paracetamol",
    quantity: 20,
    price: 3.99,
    saleDate: "2024-10-10T09:45:00",
  },
  {
    id: 4,
    name: "Amoxicillin",
    quantity: 40,
    price: 15.5,
    saleDate: "2024-10-12T16:15:00",
  },
  {
    id: 5,
    name: "Cough Syrup",
    quantity: 25,
    price: 7.25,
    saleDate: "2024-10-18T11:00:00",
  },
  {
    id: 6,
    name: "Vitamin D",
    quantity: 15,
    price: 12.99,
    saleDate: "2024-10-20T13:20:00",
  },
  {
    id: 7,
    name: "Antacid",
    quantity: 10,
    price: 6.5,
    saleDate: "2024-10-22T15:45:00",
  },
  {
    id: 8,
    name: "Cough Lozenges",
    quantity: 35,
    price: 4.25,
    saleDate: "2024-10-24T18:30:00",
  },
];

const Sales = () => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Sales Report", 20, 20);

    // Set up table headers
    doc.setFontSize(12);
    const headers = ["ID", "Medicine", "Quantity", "Price", "Sale Date"];
    const data = salesData.map((sale) => [
      String(sale.id), // Ensure ID is a string
      sale.name,
      String(sale.quantity), // Ensure quantity is a string
      `$${sale.price.toFixed(2)}`,
      new Date(sale.saleDate).toLocaleString(),
    ]);

    // Add headers to PDF
    const colWidths = [20, 50, 30, 30, 50]; // Adjust widths for better spacing
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

    // Save the PDF
    doc.save("sales_report.pdf");
  };

  return (
    <div className="flex flex-col h-[90vh] p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Sales Report</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Medicine</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{sale.id}</td>
                <td className="py-3 px-4 border-b">{sale.name}</td>
                <td className="py-3 px-4 border-b">{sale.quantity}</td>
                <td className="py-3 px-4 border-b">${sale.price.toFixed(2)}</td>
                <td className="py-3 px-4 border-b">
                  {new Date(sale.saleDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Download Sales Report
      </button>
    </div>
  );
};

export default Sales;
