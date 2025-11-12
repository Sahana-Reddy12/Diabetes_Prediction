import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', age: '', gender: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-400">Register</h2>
        {error && <p className="text-red-400 mb-3 text-center">{error}</p>}
        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full mb-4 p-3 rounded bg-gray-700" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full mb-4 p-3 rounded bg-gray-700" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-3 rounded bg-gray-700" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} className="w-full mb-4 p-3 rounded bg-gray-700" />
        <select name="gender" onChange={handleChange} className="w-full mb-6 p-3 rounded bg-gray-700">
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <button type="submit" className="w-full bg-teal-500 py-2 rounded hover:bg-teal-600">
          Register
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{' '}
          <span className="text-teal-400 cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
