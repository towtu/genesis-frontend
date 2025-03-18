import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match.');
      return;
    }
    register({ email, username, password, first_name: firstName, last_name: lastName });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-blue-200 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8 mt-1 flex items-center justify-center gap-2">
          Welcome to
          <img src="/sara.png" alt="Genesis Logo" className="w-72 h-16" />
        </h1>
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Sign-up now</h2>
            <div className="text-blue-700 text-3xl font-bold">G</div>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500 mb-4">{error.message}</div>}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
              <span
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
              <span
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? 'Signing up...' : 'Continue'}
            </button>
            <div className="flex items-center mt-4">
              <input type="checkbox" className="mr-2" />
              <p className="text-xs text-gray-500">
                By creating an account, I agree to our{' '}
                <a href="#" className="text-blue-600">
                  Terms of use
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600">
                  Privacy Policy
                </a>
              </p>
            </div>
            <div>
              <a href="/login" className="text-blue-600 underline block text-center">
                Already have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;