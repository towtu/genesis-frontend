import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <div className="mt-9 mx-28">
            <img src="/lala.png" alt="Abstract geometric shapes" className="w-100 h-100" />
          </div>
        </div>

        {/* Right Side - Login Box */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
            {error && <div className="text-red-500 mb-4 text-center">{error.message}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email address"
                className="w-full p-3 border border-gray-300 rounded text-lg"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-3 border border-gray-300 rounded text-lg"
                  required
                />
                <span
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              <div className="flex justify-between text-md">
                <a className="text-blue-500" href="/register">Register Now</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;