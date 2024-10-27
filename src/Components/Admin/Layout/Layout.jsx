// components/Layout.js
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    localStorage.setItem("userName", "John Doe");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white h-20 shadow-lg px-10 flex justify-between items-center">
        <h1
          onClick={() => navigate("/admin/home")}
          className="text-3xl font-bold cursor-pointer hover:text-blue-200"
        >
          MedManage
        </h1>
        <div className="flex space-x-8">
          <Link
            to="/admin/auditing"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Auditing
          </Link>
          <Link
            to="/admin/inventory"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Inventory
          </Link>
          <Link
            to="/admin/trending"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Trending
          </Link>
          <Link
            to="/admin/sales"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Sales
          </Link>
          <Link
            to="/admin/chat"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Chat
          </Link>
        </div>
        <div className="relative group">
          <div
            className="bg-blue-400 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-all duration-300"
            title={userName}
          >
            <span className="text-xl font-semibold">
              {userName ? userName.charAt(0).toUpperCase() : "?"}
            </span>
          </div>
          {/* Tooltip with full username on hover */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10">
            {userName}
          </div>
        </div>
      </nav>
      <div className="p-8 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
