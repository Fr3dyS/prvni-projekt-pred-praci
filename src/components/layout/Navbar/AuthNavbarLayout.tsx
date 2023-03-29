import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

export default function AuthNavbarLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { logout } = useAuth();
    const { user } = useAuth();
    const toggle = () => setIsOpen(prevState => !prevState);


    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <nav className='bg-gray-800 shadow-lg'>
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
                            className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/' && 'bg-white text-zinc-900 rounded text-slate-900 text-stone-900 hover:text-zinc-600'
                                }`}
                            onClick={() => handleLinkClick('/')}
                        >
                            Overview
                        </Link>
                        <Link
                            to="/users"
                            className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/users' && 'bg-white text-zinc-900 rounded text-slate-900 text-stone-900 hover:text-zinc-600'
                                }`}
                            onClick={() => handleLinkClick('/users')}
                        >
                            User List
                        </Link>
                        <Link
                            to="/users/new"
                            className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/users/new' && 'bg-white text-zinc-900 rounded text-slate-900 text-stone-900 hover:text-zinc-600'
                                }`}
                            onClick={() => handleLinkClick('/users/new')}
                        >
                            Create New User
                        </Link>
                    </div>
                    <div className="ml-6">
                        <div className="relative ml-4">
                            <button
                                className="flex text-white items-center focus:outline-none"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Profile</span>
                                <svg className="h-4 w-4 fill-current ml-1" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.7 8.3a1 1 0 011.4 0l3 3 3-3a1 1 0 011.4 1.4l-3.5 3.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 010-1.4zm0 4a1 1 0 011.4 0l3 3 3-3a1 1 0 011.4 1.4l-3.5 3.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 010-1.4z"
                                    />
                                </svg>
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-t from-gray-800 to-gray-700 rounded-md shadow-lg animate-slide-in">
                                    <div className="p-4">
                                        <span className="block font-bold text-white mb-2">Přihlášen jako:</span>
                                        <span className="block text-gray-300">{user?.username}</span>
                                    </div>
                                    <div className="p-4">
                                        <span className="block font-bold text-white mb-2">Role:</span>
                                        <span className="block text-gray-300">{user?.role}</span>
                                    </div>
                                    <div className="p-4">
                                        <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full border border-gray-400 transition duration-300 ease-in-out" onClick={logout}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L5.586 11H15a1 1 0 010 2H5a1 1 0 01-.707-.293z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M10 4a1 1 0 011 1v8a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}