import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { BackGround_IMG_URL } from "../utils/constants";
import { setUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email, password
      });

      const result = response.data;
      dispatch(setUser(result));
      console.log(result);
      localStorage.setItem("userName", result.user.name);
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem("userRole", result.user.role);
      localStorage.setItem("userId", result.user.id);

      if (result.token) {
        localStorage.setItem("token", result.token);
        alert("Login Successfully.");
        navigate("/body/mainContainer");
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Invalid Credentials.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <img
        className="absolute h-screen w-screen object-cover"
        src={BackGround_IMG_URL}
        alt="Restaurant Background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Login Form */}
      <form
        // onSubmit={handleSubmit}
        className="absolute flex flex-col p-8 w-96 bg-white rounded-xl shadow-2xl my-20 mx-auto right-0 left-0"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://png.pngtree.com/png-vector/20250916/ourmid/pngtree-food-restaurant-logo-vector-modern-cafe-dining-fast-grill-organic-bakery-png-image_17471779.webp"
            alt="FoodHub Logo"
            className="h-24 w-24"
          />
        </div>

        <h1 className="text-center text-2xl font-bold text-red-600 mb-6">
          Welcome to FoodHub
        </h1>

        <div className="relative m-2">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="absolute left-4 top-4 text-gray-400">
            📧
          </span>
        </div>

        <div className="relative m-2">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute left-4 top-4 text-gray-400">
            🔒
          </span>
        </div>

        <button
          type="submit"
          className="m-2 p-4 bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold rounded-lg shadow-md"
          onClick={handleSubmit}
        >
          Login
        </button>

        <p className="text-center text-gray-700 mt-4">
          Don’t have an account?
          <Link to="/register" className="ml-2 text-red-600 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;