import { useEffect, useState } from 'react';
import { getDashboard } from '../services/api';

const Navbar = () => {
    const [message, setMessage] = useState('Welcome to Genesis');
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        const fetchNavbarMessage = async () => {
            if (!token) return; // Only fetch if the token exists

            try {
                const response = await getDashboard();
                setMessage(response.data.response);
            } catch (error) {
                console.error('Failed to fetch navbar message', error);
            }
        };

        fetchNavbarMessage();
    }, [token]); // Runs again when `token` changes

    // Listen for token updates (e.g., after login)
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('access_token'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">{message}</h1>
            </div>
        </nav>
    );
};

export default Navbar;