import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function UnauthNavbarLayout() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <nav className="bg-gray-800 py-2 md:py-4">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="text-white font-bold text-xl">
                    Můj web
                </Link>

                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                        </svg>
                    </button>
                </div>

                <div className="hidden md:flex md:items-center">
                    <Link
                        to="/login"
                        className={`text-white py-2 px-4 hover:text-gray-300 ${activeLink === '/login' && 'bg-white rounded hover:bg-gray-100 text-gray-800 text-stone-900 hover:text-stone-400'
                            }`}
                        onClick={() => handleLinkClick('/login')}
                    >
                        Přihlášení
                    </Link>
                    <Link
                        to="/register"
                        className={`text-white py-2 px-4 ml-4 hover:text-gray-300 ${activeLink === '/register' && 'bg-white rounded hover:bg-gray-100 text-gray-800 text-stone-900 hover:text-stone-400'
                            }`}
                        onClick={() => handleLinkClick('/register')}
                    >
                        Registrace
                    </Link>
                </div>
            </div>

            <div className="hidden md:hidden">
                <div className="px-2 pt-2 pb-3">
                    <Link
                        to="/login"
                        className="block text-white py-2 px-4 hover:text-gray-300"
                    >
                        Přihlášení
                    </Link>
                    <Link
                        to="/register"
                        className="block text-white py-2 px-4 mt-1 hover:text-gray-300"
                    >
                        Registrace
                    </Link>
                </div>
            </div>
        </nav>
    );
}