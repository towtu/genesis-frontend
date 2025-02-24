import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/dashboard');
      window.location.reload(); // Force a page reload after navigation
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="bg-blue-200 flex items-center justify-center min-h-screen">
      <div className="bg-blue-500 w-full py-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left p-4">
              <h1 className="title text-5xl text-blue-900">Genesis</h1>
              <p className="text-lg text-black mt-4">
                Your simple, intuitive to-do list platform designed to help you organize tasks and boost productivity effortlessly.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8 md:mt-0 md:ml-8 w-full md:w-1/3">
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email address"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <a className="text-blue-500" href="#">
                    Forgot Password?
                  </a>
                  <a className="text-blue-500" href="#">
                    Register Now
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded"
                >
                  Log in
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="text-sm">Or you can join with</p>
                <div className="flex justify-center mt-2">
                  <button className="bg-gray-200 rounded-full p-3 mx-2">
                    <i className="fab fa-google"></i>
                  </button>
                  <button className="bg-gray-200 rounded-full p-3 mx-2">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="bg-gray-200 rounded-full p-3 mx-2">
                    <i className="fab fa-apple"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <img
          src="https://placehold.co/150x150"
          alt="Abstract geometric shapes"
          className="w-32 h-32"
        />
      </div>
    </div>
  );
};

export default Login;