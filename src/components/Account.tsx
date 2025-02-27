import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; // Import your configured axios instance
import { BadgeCheck, BadgeMinus, Edit, Save, X, CheckCircle, Clock, Activity } from "lucide-react"; // Import icons

const Account: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="flex min-h-full justify-center items-start mx-auto p-6 bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Profile Information */}
          <div>
            {isEditing ? (
              <form className="space-y-6">
                {/* First Name */}
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                    rows={4}
                  />
                </div>

                {/* Verification Status */}
                <div className="flex items-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Verification Status:</p>
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
                  <p className="text-sm text-gray-700 dark:text-gray-300">First Name:</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{profile.first_name}</p>
                </div>

                {/* Last Name */}
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Last Name:</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{profile.last_name}</p>
                </div>

                {/* Bio */}
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Bio:</p>
                  <div className="mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {profile.bio || "No bio provided."}
                    </p>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="flex items-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Verification Status:</p>
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
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Task Statistics</h3>

            {/* Completed Tasks */}
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Completed Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.completed}</p>
                </div>
              </div>
            </div>

            {/* In Progress Tasks */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="text-blue-500" size={24} />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">In Progress Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.inProgress}</p>
                </div>
              </div>
            </div>

            {/* Overdue Tasks */}
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="text-red-500" size={24} />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Overdue Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.overdue}</p>
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
