import React from "react";

const UserChatHome = () => {
  const userName = "Jeet";
  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white h-20 shadow-lg px-10 flex justify-between items-center">
        <h1
          onClick={() => navigate("/admin/home")}
          className="text-3xl font-bold cursor-pointer hover:text-blue-200"
        >
          MedManage
        </h1>
        <div className="relative group">
          <div
            className="bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-all duration-300"
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
      <h1>User Chat Home</h1>
    </div>
  );
};

export default UserChatHome;
