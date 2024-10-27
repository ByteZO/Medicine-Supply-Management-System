import React from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  return (
    <> <div className="overflow-hidden">

   
      <nav className="bg-white shadow-md py-4  px-8 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          className="text-2xl font-bold text-blue-600"
        >
          MedManage
        </h1>
      </nav>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
            Create an Account
          </h2>

          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Choose a username"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Create a password"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default SignUp;
