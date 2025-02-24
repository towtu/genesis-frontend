import { useEffect, useState } from 'react';
import { getDashboard } from '../services/api';

const Navbar = () => {
    const [message, setMessage] = useState('Welcome to Genesis');
    const [token, setToken] = useState(localStorage.getItem('access_token'));

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
        const handleStorageChange = () => {
            setToken(localStorage.getItem('access_token'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <nav className="bg-blue-800 text-white p-4 shadow-md fixed top-0 w-full">
            <div className="container mx-auto flex items-center">
                <h1 className="text-lg font-bold"> <img src="/yaya.png" alt="Genesis Logo" className="w-10 h-8" /></h1>
                <p className='mx-1'>{message}</p>
            </div>
        </nav>
    );
};

export default Navbar;