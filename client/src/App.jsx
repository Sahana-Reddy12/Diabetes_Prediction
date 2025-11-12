import React from "react";
import { Routes, Route } from "react-router-dom";

// Import All Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import Profile from "./pages/Profile";
import History from "./pages/History"; 
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/*  Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/*  Protected Routes with Navbar (Layout) */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/predict"
        element={
          <Layout>
            <Predict />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      {/* New History Page for Past Predictions */}
      <Route
        path="/history"
        element={
          <Layout>
            <History />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
