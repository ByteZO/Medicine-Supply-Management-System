// components/Layout.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="bg-blue-600 text-white h-20 shadow-md px-10 flex items-center">
        <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-200 mr-8">
          MedManage
        </h1>
        <div className="flex space-x-6 ml-auto">
          <Link to="/admin/auditing" className="hover:text-blue-200">
            Auditing
          </Link>
          <Link to="/admin/inventory" className="hover:text-blue-200">
          Inventory
          </Link>
          <Link to="/admin/trending" className="hover:text-blue-200">
            Trending
          </Link>
          <Link to="/admin/sales" className=" hover:text-blue-200">
            Sales
          </Link>
          <Link to="/admin/chat" className="hover:text-blue-200">
            Chat
          </Link>
        </div>
      </nav>
      <div className="p-8 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
