// components/Layout.js
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Narayan");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-l from-blue-400 to-blue-600 text-white h-20 shadow-lg px-10 flex justify-between items-center">
        <h1
          onClick={() => navigate("/admin/home")}
          className="text-3xl font-bold cursor-pointer hover:text-blue-200"
        >
          MedManage
        </h1>
        <div className="flex space-x-8">
          <Link
            to="/admin/auditing"
            className="hover:text-blue-300 transition-colors duration-300 font-medium text-[1.1rem]"
          >
            Auditing
          </Link>
          <Link
            to="/admin/inventory"
            className="hover:text-blue-300 transition-colors duration-300 font-medium text-[1.1rem]"
          >
            Inventory
          </Link>
          <Link
            to="/admin/trending"
            className="hover:text-blue-300 transition-colors duration-300 font-medium text-[1.1rem]"
          >
            Trending
          </Link>
          <Link
            to="/admin/sales"
            className="hover:text-blue-300 transition-colors duration-300 font-medium text-[1.1rem]"
          >
            Sales
          </Link>
          <Link
            to="/admin/chat"
            className="hover:text-blue-300 transition-colors duration-300 font-medium text-[1.1rem]"
          >
            Chat
          </Link>
        </div>
        <div className="relative group flex">
          <div
            className="bg-cyan-700 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all duration-300"
            title={userName}
          >
            <span className="text-xl font-semibold">
              {userName ? userName.charAt(0).toUpperCase() : "?"}
            </span>
          </div>
          {/* Tooltip with full username on hover */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10">
            {userName}
          </div>
          <button
            onClick={() => {
              localStorage.clear();

              navigate("/login");
            }}
            className="bg-blue-600 text-white font-semibold   px-4  rounded  mx-3  hover:bg-blue-700 transition duration-300 transform hover:translate-y-1"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className=" bg-gray-900 max-h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
