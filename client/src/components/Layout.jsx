import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar />

      {/*  Main Page Content */}
      <main className="flex-grow pt-24 px-4 flex justify-center">
        {children}
      </main>

      {/*  Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Diabetes Predictor | Built by{" "}
        <span className="text-teal-400 font-medium">Sahana Reddy</span>
      </footer>
    </div>
  );
}
