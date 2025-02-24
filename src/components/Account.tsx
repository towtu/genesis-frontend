import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; // Import your configured axios instance
import Sidebar from "./Sidebar";
import { BadgeCheck, BadgeMinus } from "lucide-react"; // Import the BadgeCheck icon

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    image: "",
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full bg-gray-100">
        <div className="bg-white p-20 shadow-md w-full h-screen ">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>

          {isEditing ? (
            <form>
              <div className="mb-4">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-700">{profile.first_name}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-700">{profile.last_name}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-700">Bio: {profile.bio}</p>
              </div>
              <div className="mb-4 flex items-center">
                <p className="text-sm text-gray-700">Verified:</p>
                {profile.verified ? (
                  <BadgeCheck className="ml-2 text-blue-500" size={20} /> // Verified badge
                ) : (
                  <BadgeMinus className="ml-2 text-blue-500" size={20} /> // Placeholder for unverified
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;