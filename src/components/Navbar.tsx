import { useEffect, useState } from 'react';
import { getDashboard } from '../services/api';
import { useTheme } from './ThemeContext'; // Import useTheme

const Navbar = () => {
  const [message, setMessage] = useState('Welcome to Genesis');
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const { theme } = useTheme(); // Get the current theme

  // Fetch the dashboard message when the token changes
  useEffect(() => {
    const fetchNavbarMessage = async () => {
      if (!token) return;

      try {
        const response = await getDashboard();
        setMessage(response.data.response);
      } catch (error) {
        console.error('Failed to fetch navbar message', error);
      }
    };

    fetchNavbarMessage();
  }, [token]);

  // Listen for changes in localStorage (e.g., token updates)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'access_token') {
        setToken(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav className={`bg-blue-800 text-white p-3 shadow-md fixed top-0 w-full z-10 dark:bg-gray-900`}>
      <div className="container mx-auto flex items-center">
        {/* Logo */}
        <img src="/yaya.png" alt="Genesis Logo" className="w-10 h-8" />
        {/* Message */}
        <p className="ml-2 text-lg font-semibold">{message}</p>
      </div>
    </nav>
  );
};

export default Navbar;
