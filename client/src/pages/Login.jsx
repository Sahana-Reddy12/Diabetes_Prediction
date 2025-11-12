import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-teal-400 mb-8">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-teal-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-teal-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-lg font-semibold transition duration-200"
        >
          Login
        </button>

        <div className="flex justify-between text-sm text-gray-400 mt-3">
          <Link to="/forgot-password" className="hover:text-teal-400">
            Forgot Password?
          </Link>
          <Link to="/register" className="hover:text-teal-400">
            Don’t have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
