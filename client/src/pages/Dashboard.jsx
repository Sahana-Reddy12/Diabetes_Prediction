import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 flex flex-col items-center p-8">
      <Navbar />

      <div className="max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-teal-400 mb-6">Understanding Diabetes</h2>
        <p className="text-gray-300 text-lg mb-4">
          Diabetes is a chronic condition that affects how your body turns food into energy.
          It occurs when your pancreas doesn’t make enough insulin or your body can’t use
          insulin effectively, causing blood sugar levels to rise.
        </p>

        <p className="text-gray-400 text-md mb-8">
          Common causes include obesity, lack of exercise, high BMI, stress, and genetic history.
          Early prediction can prevent severe complications such as heart disease, nerve damage,
          and kidney issues.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          💡 Important Health Parameters
        </h3>

        <ul className="text-left text-gray-200 space-y-3 bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
          <li><b>Pregnancies:</b> Multiple pregnancies increase diabetes risk in women.</li>
          <li><b>Glucose:</b> Blood sugar above 140 mg/dL may indicate diabetes.</li>
          <li><b>Blood Pressure:</b> Normal range is 80–130 mmHg.</li>
          <li><b>Skin Thickness:</b> Reflects fat distribution under the skin.</li>
          <li><b>Insulin:</b> Imbalanced insulin levels show poor glucose control.</li>
          <li><b>BMI:</b> A BMI above 25 indicates overweight, which increases risk.</li>
          <li><b>Diabetes Pedigree Function:</b> Indicates family history impact.</li>
          <li><b>Age:</b> Risk increases significantly after 45 years of age.</li>
        </ul>

        <button
          onClick={() => navigate("/predict")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-md"
        >
          🧠 Go to Diabetes Prediction
        </button>
      </div>
    </div>
  );
}
