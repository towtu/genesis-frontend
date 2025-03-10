import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate("/dashboard");
      window.location.reload();
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-blue-200 h-screen w-screen flex items-center justify-center">
      <div className="flex w-full h-full bg-blue-200 p-12">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <img src="/sara.png" alt="Genesis Logo" className="w-96 h-24" />
          <p className="text-lg text-black mt-6">
            Your simple, intuitive to-do list platform designed to help you organize tasks and boost productivity effortlessly.
          </p>
          {/* Abstract Art Placeholder */}
          <div className="mt-9 mx-28">
            <img
              src="/lala.png"
              alt="Abstract geometric shapes"
              className="w-100 h-100"
            />
          </div>
        </div>

        {/* Right Side - Smaller Login Box */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email address"
                className="w-full p-3 border border-gray-300 rounded text-lg"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded text-lg"
                required
              />
              <div className="flex justify-between text-md">
                <a className="text-blue-500" href="/register">Register Now</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded text-lg font-bold"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
