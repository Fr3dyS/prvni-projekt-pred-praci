import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';


export default function AuthNavbarLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { logout } = useAuth();
    const { user } = useAuth();
    const toggle = () => setIsOpen(prevState => !prevState);

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link to="/" className="text-white font-bold text-xl">
                        Můj web
                    </Link>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-white focus:outline-none focus:text-white ml-4"
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path
                                    className="heroicon-ui"
                                    d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="hidden md:flex">
                    <div className="flex items-center ml-6">
                        <Link
                            to="/"
                            className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/' && 'bg-white text-gray-800'
                                }`}
                        >
                            Overview
                        </Link>
                        <Link
                            to="/users"
                            className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/users' && 'bg-white text-gray-800'
                                }`}
                        >
                            User List
                        </Link>
                        <Link
                            to="/users/new"
                            className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/users/new' && 'text-black bg-white text-gray-800'
                                }`}
                        >
                            Create New User
                        </Link>
                    </div>
                    <div className="ml-6">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={logout}
                        >
                            Odhlásit se
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    );
}