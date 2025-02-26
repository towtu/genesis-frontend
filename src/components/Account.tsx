import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; // Import your configured axios instance
import { BadgeCheck, BadgeMinus, Edit, Save, X } from "lucide-react"; // Import icons

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    verified: false,
  });

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile/"); // Use the api instance
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await api.put("/profile/", profile); // Use the api instance
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex min-h-full justify-center items-center mx-auto">
      {/* Main Content */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        {isEditing ? (
          <form className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={profile.first_name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={profile.last_name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Verification Status */}
            <div className="flex items-center">
              <p className="text-sm text-gray-700">Verification Status:</p>
              {profile.verified ? (
                <BadgeCheck className="ml-2 text-blue-500" size={20} /> // Verified badge
              ) : (
                <BadgeMinus className="ml-2 text-blue-500" size={20} /> // Placeholder for unverified
              )}
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                <X size={16} /> Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <p className="text-sm text-gray-700">First Name:</p>
              <p className="text-lg font-semibold">{profile.first_name}</p>
            </div>

            {/* Last Name */}
            <div>
              <p className="text-sm text-gray-700">Last Name:</p>
              <p className="text-lg font-semibold">{profile.last_name}</p>
            </div>

            {/* Bio */}
            <div>
              <p className="text-sm text-gray-700">Bio:</p>
              <div className="mt-1 p-3 border border-gray-300 rounded-md">
                <p className="text-lg font-semibold">{profile.bio || "No bio provided."}</p>
              </div>
            </div>

            {/* Verification Status */}
            <div className="flex items-center">
              <p className="text-sm text-gray-700">Verification Status:</p>
              {profile.verified ? (
                <BadgeCheck className="ml-2 text-blue-500" size={20} /> // Verified badge
              ) : (
                <BadgeMinus className="ml-2 text-blue-500" size={20} /> // Placeholder for unverified
              )}
            </div>

            {/* Edit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                <Edit size={16} /> Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
