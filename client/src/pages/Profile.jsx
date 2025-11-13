import React, { useState, useEffect } from "react";

export default function Profile() {
  // Load saved profile if exists
  const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};

  const [profileData, setProfileData] = useState({
    name: savedProfile.name || "Sahana Reddy",
    email: savedProfile.email || "sahanareddybairugani@gmail.com",
    age: savedProfile.age || "22",
    gender: savedProfile.gender || "Female",
    image: localStorage.getItem("profileImage") || "/default-avatar.png",
  });

  const [preview, setPreview] = useState(profileData.image);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        localStorage.setItem("profileImage", reader.result);
        setProfileData({ ...profileData, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profileData));
    alert("Profile saved successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 pt-20">
      <div className="bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-gray-700">

        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-400 shadow-md"
            />

            <label
              htmlFor="imageUpload"
              className="absolute bottom-2 right-2 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full cursor-pointer transition duration-200"
            >
              📷
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-teal-400 mt-4">
            {profileData.name}
          </h2>
          <p className="text-gray-400">Your Personal Profile</p>
        </div>

        {/* Input Form */}
        <form className="flex flex-col space-y-4 text-left">
          <div>
            <label className="text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              disabled
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-gray-300">Age</label>
            <input
              type="number"
              name="age"
              value={profileData.age}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="text-gray-300">Gender</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400"
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
