import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css"; // Ensure you have your styles imported

function SignUp() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 25);

    return () => clearTimeout(timer);
  }, []);

  const submitHandler = () => {
    if (
      (userName === "user1" || userName === "user2") &&
      (email === "user1@email.com" || email === "user2@email.com") &&
      (password === "testuser1" || password === "testuser2")
    ) {
      // Save user details in local storage
      localStorage.setItem("userName", userName);
      localStorage.setItem("email", email);
      localStorage.setItem("role", "user");
  
      navigate("/chat");
    } else if (
      userName === "admin" &&
      email === "admin@email.com" &&
      password === "1234"
    ) {
      // Save admin details in local storage
      localStorage.setItem("userName", userName);
      localStorage.setItem("email", email);
      localStorage.setItem("role", "admin");
  
      navigate("/admin/home");
    }
  };
  

  return (
    <>
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center rounded-b-lg transition-transform transform">
        <h1
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          className="text-3xl font-extrabold text-gray-700"
        >
          MedManage
        </h1>
      </nav>
      <div className="bg-gradient-to-t from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
        <div
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md transition-opacity duration-1000 ease-in ${
            isVisible ? "opacity-100" : "opacity-0"
          } transform ${isVisible ? "translate-y-0" : "translate-y-10"}`}
        >
          <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
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
                onChange={(e) => setUserName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-300 transform hover:translate-y-1"
              type="button"
              onClick={submitHandler}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
