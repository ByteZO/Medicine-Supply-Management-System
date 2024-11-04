import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AdminHero() {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Sales",
        data: [1000, 1200, 1600, 2000],
        borderColor: "#5B8DFE", // Adjusted to a lighter blue for better contrast on dark
        backgroundColor: "rgba(91, 141, 254, 0.2)", // Light background for the chart area
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="p-8 bg-gray-800 text-white rounded-lg shadow-lg space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold animate-fade-in">Welcome back, Admin!</h1>
          <p className="mt-2 text-lg text-gray-400 animate-fade-in delay-1">
            Here’s what’s happening today:
          </p>
        </div>
        <div className="flex space-x-4 animate-fade-in delay-2">
          {/* Shortcut Buttons */}
          {["Auditing", "Inventory", "Sales"].map((button) => (
            <button
              key={button}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => console.log(`Navigating to ${button}`)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Statistics Overview */}
        <div className="grid grid-row-1 md:grid-row-3 gap-6 w-[30%]">
          {[
            { title: "Total Medicines", value: "245" },
            { title: "Medicines Expiring Soon", value: "12" },
            { title: "Sales This Month", value: "$5,250" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-900 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-bold">{stat.title}</h3>
              <p className="text-3xl font-semibold mt-2 animate-fade-in">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Graph section */}
        <div className="bg-gray-200 rounded-lg shadow-md p-6 mt-0 h-[30rem] w-[50rem] m-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Sales Overview</h3>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AdminHero;
