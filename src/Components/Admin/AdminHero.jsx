// components/AdminHero.js
import React from "react";

function AdminHero() {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Welcome back, Admin!</h1>
          <p className="mt-2 text-lg text-blue-200">
            Here’s what’s happening today:
          </p>
        </div>
        <div className="flex space-x-6">
          {/* Shortcut Buttons */}
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all"
            onClick={() => console.log("Navigating to Auditing")}
          >
            Auditing
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all"
            onClick={() => console.log("Navigating to Inventory")}
          >
            Inventory
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all"
            onClick={() => console.log("Navigating to Sales")}
          >
            Sales
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Total Medicines</h3>
          <p className="text-3xl font-semibold mt-2">245</p>
        </div>
        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Medicines Expiring Soon</h3>
          <p className="text-3xl font-semibold mt-2">12</p>
        </div>
        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Sales This Month</h3>
          <p className="text-3xl font-semibold mt-2">$5,250</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHero;
