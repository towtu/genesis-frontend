import { useEffect, useState } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { getDashboard } from '../services/api';
import { useTheme } from './ThemeContext';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [message, setMessage] = useState('Welcome to Genesis');
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const { theme, setTheme } = useTheme();

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
    <nav className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-800'} text-white p-3 shadow-md fixed top-0 w-full z-10`}>
      <div className="flex items-center gap-3 px-4">
        {/* Hamburger — only on mobile */}
        <button
          onClick={onMenuClick}
          className={`p-1 rounded lg:hidden ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <img src="/yaya.png" alt="Genesis Logo" className="w-10 h-8" />
        <p className="text-lg font-semibold truncate">{message}</p>

        {/* Dark mode toggle — right corner */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`ml-auto p-1.5 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
