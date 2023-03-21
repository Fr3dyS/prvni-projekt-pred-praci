import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

type MenuItem = {
    title: string;
    link: string;
};

export default function AuthNavbarLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { logout } = useAuth();

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col md:flex-row md:min-h-screen w-full">
            {/* Desktop menu */}
            <div className="hidden md:flex md:flex-col md:w-56 md:min-h-screen md:border-r md:border-gray-200">
                <div className="flex items-center justify-center md:flex-shrink-0 h-16">
                    <span className="text-xl font-bold text-gray-800">Menu</span>
                </div>
                <div className="flex-grow md:flex-shrink-0">
                    <Link
                        to="/"
                        className={`text-black py-2 px-4 hover:text-gray-300 ${activeLink === '/' && 'bg-white rounded hover:bg-gray-100 text-gray-800 text-stone-900 hover:text-stone-400'
                            }`}
                        onClick={() => handleLinkClick('/')}
                    >
                        Overview
                    </Link>
                    <Link
                        to="/users"
                        className={`text-black py-2 px-4 ml-4 hover:text-gray-300 ${activeLink === '/users' && 'bg-white rounded hover:bg-gray-100 text-gray-800 text-stone-900 hover:text-stone-400'
                            }`}
                        onClick={() => handleLinkClick('/users')}
                    >
                        user list
                    </Link>
                    <Link
                        to="/users/:id"
                        className={`text-black py-2 px-4 hover:text-gray-300 ${activeLink === '/users/:id' && 'bg-white rounded hover:bg-gray-100 text-gray-800 text-stone-900 hover:text-stone-400'
                            }`}
                        onClick={() => handleLinkClick('/users/:id')}
                    >
                        user detail
                    </Link>
                    <Link
                        to="/users/new"
                        className={`text-black py-2 px-4 ml-4 hover:text-gray-300 ${activeLink === '/users/new' && 'bg-white rounded hover:bg-gray-100 text-gray-800 text-stone-900 hover:text-stone-400'
                            }`}
                        onClick={() => handleLinkClick('/users/new')}
                    >
                        create user
                    </Link>
                    <Link
                        to="/users/edit/:id"
                        className={`text-black py-2 px-4 ml-4 hover:text-gray-300 ${activeLink === '/users/edit/:id' && 'bg-white rounded hover:bg-gray-100 text-gray-800 text-stone-900 hover:text-stone-400'
                            }`}
                        onClick={() => handleLinkClick('/users/edit/:id')}
                    >
                        edit user
                    </Link>
                    <button
                        className='rounded text-red-500 border-2 w-min px-4 border-red-500 bg-transparent hover:bg-red-500 hover:text-white'
                        type='button'
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}