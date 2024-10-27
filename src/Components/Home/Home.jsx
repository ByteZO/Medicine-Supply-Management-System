import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MedManage</h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-transparent text-blue-600 font-semibold px-4 py-2 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="text-center mt-24">
        <h2 className="text-4xl font-semibold text-gray-800">
          Welcome to MedManage
        </h2>
        <p className="mt-4 text-gray-600">
          Your one-stop solution for managing medical inventory with ease.
        </p>
      </div>
    </div>
  );
}

export default Home;
