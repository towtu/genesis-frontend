import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; // Import your configured axios instance
import { BadgeCheck, BadgeMinus, Edit, Save, X, CheckCircle, Clock, Activity } from "lucide-react"; // Import icons
import { useTheme } from "./ThemeContext"; // Import useTheme

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    verified: false,
  });
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    inProgress: 0,
    overdue: 0,
  });

  // Fetch profile data and task statistics from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile/"); // Use the api instance
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    const fetchTaskStats = async () => {
      try {
        const response = await api.get("/tasks/stats/"); // Example endpoint for task stats
        setTaskStats(response.data);
      } catch (error) {
        console.error("Failed to fetch task stats:", error);
      }
    };

    fetchProfile();
    fetchTaskStats();
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
    <div className={`flex min-h-full justify-center items-start mx-auto p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Main Content */}
      <div className={`p-8 border rounded-lg shadow-sm w-full max-w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Profile Information */}
          <div>
            {isEditing ? (
              <form className="space-y-6">
                {/* First Name */}
                <div>
                  <label htmlFor="first_name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="last_name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    rows={4}
                  />
                </div>

                {/* Verification Status */}
                <div className="flex items-center">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Verification Status:</p>
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
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Save size={16} /> Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* First Name */}
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>First Name:</p>
                  <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{profile.first_name}</p>
                </div>

                {/* Last Name */}
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Last Name:</p>
                  <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{profile.last_name}</p>
                </div>

                {/* Bio */}
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Bio:</p>
                  <div className={`mt-1 p-3 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
                    <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {profile.bio || "No bio provided."}
                    </p>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="flex items-center">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Verification Status:</p>
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
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Edit size={16} /> Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Task Statistics */}
          <div>
            <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Task Statistics</h3>

            {/* Completed Tasks */}
            <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900' : 'bg-green-50'}`}>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Completed Tasks</p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{taskStats.completed}</p>
                </div>
              </div>
            </div>

            {/* In Progress Tasks */}
            <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'}`}>
              <div className="flex items-center gap-3">
                <Activity className="text-blue-500" size={24} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>In Progress Tasks</p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{taskStats.inProgress}</p>
                </div>
              </div>
            </div>

            {/* Overdue Tasks */}
            <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900' : 'bg-red-50'}`}>
              <div className="flex items-center gap-3">
                <Clock className="text-red-500" size={24} />
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Overdue Tasks</p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{taskStats.overdue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
