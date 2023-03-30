import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModeContext } from '../../../context/ThemeProvider';
import Lightswitch from './Lightswitch';

export default function UnauthNavbarLayout() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { theme } = useContext(ModeContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`py-2 md:py-4 ${theme === 'light' ? 'bg-gray-800' : theme === 'dark' ? 'bg-gray-900' : theme === 'red' ? 'bg-red-800' : 'bg-gray-800'}`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="text-white font-bold text-xl">
                    Můj web
                </Link>

                <div className="flex md:hidden">
                    <button
                        type="button"
                        className='text-gray-500 hover:text-white focus:outline-none focus:text-white ml-auto md:hidden'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                        </svg>
                    </button>
                </div>

                <div className="hidden md:flex md:items-center">
                    <Link to="/login" className={`text-white py-2 px-4 hover:text-gray-300 ${activeLink === '/login' && 'bg-white text-zinc-900 rounded text-slate-900 text-stone-900 hover:text-zinc-600'}`} onClick={() => handleLinkClick('/login')}>
                        Přihlášení
                    </Link>
                    <Link to="/register" className={`text-white py-2 px-4 ml-4 hover:text-gray-300 ${activeLink === '/register' && 'bg-white text-zinc-900 rounded text-slate-900 text-stone-900 hover:text-zinc-600'}`} onClick={() => handleLinkClick('/register')}>
                        Registrace
                    </Link>
                    <Lightswitch />
                </div>
            </div>
            <div className="md:hidden">
                <div className={`px-2 pt-2 pb-3 ${isMenuOpen ? 'block' : 'hidden'}`} style={{ textAlign: 'right' }}>
                    <Link to="/login" className="block text-white py-2 px-4 hover:text-gray-300">
                        Přihlášení
                    </Link>
                    <Link to="/register" className="block text-white py-2 px-4 mt-1 hover:text-gray-300">
                        Registrace
                    </Link>
                    <Lightswitch  />
                </div>
            </div>




        </nav>
    );
}
