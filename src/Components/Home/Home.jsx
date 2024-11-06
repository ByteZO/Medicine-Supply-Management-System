import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import GlowingWelcomeTitle from "./GlowingWelcomeTitle";
// import bg from '../../assets/download.jpeg';

function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // State for controlling fade-in

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Set to true after a delay
    }, 500); // Delay in milliseconds before fade-in starts

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-gradient-to-t from-gray-900 to-gray-800 min-h-screen flex flex-col justify-between">
    {/* <div className="bg-gray-900 min-h-screen flex flex-col justify-between"> */}
      <nav className="bg-white shadow-lg py-3 px-8 flex justify-between items-center  transition-transform transform">
        <h1 className="text-3xl font-extrabold text-gray-700">MedManage</h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-transparent text-blue-600 font-semibold px-6 py-2 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300 transform hover:translate-y-1"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition duration-300 transform hover:translate-y-1"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="text-center mt-24">
        <GlowingWelcomeTitle />
        <p className={`mt-4 text-white font-sans font-semi-bold text-xl transition-opacity duration-1000 ease-in delay-200 ${
          isVisible ? "opacity-100 slide-in" : "opacity-0"
        }`}>
          Your one-stop solution for managing medical inventory with ease.
        </p>
      </div>

      <footer className="text-center text-md mt-12 mb-4 text-white font-sans font-bold">
        <p>&copy; 2024 MedManage. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
