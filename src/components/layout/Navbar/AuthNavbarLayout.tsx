import { useState } from 'react';
import { Link } from 'react-router-dom';

type MenuItem = {
    title: string;
    link: string;
};

const menuItems: MenuItem[] = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
];

export default function AuthNavbarLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col md:flex-row md:min-h-screen w-full">

            {/* Mobile menu */}
            <div className="md:hidden flex justify-end pr-4 pt-4">
                <button
                    onClick={toggleMenu}
                    className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className={`${isOpen ? 'hidden' : 'block'}`}
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 6h18v3H3V6zm0 5h18v3H3v-3zm0 5h18v3H3v-3z"
                        />
                        <path
                            className={`${isOpen ? 'block' : 'hidden'}`}
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 7v10H6V7h2zm4 0v10h-2V7h2zm4 0v10h-2V7h2z"
                        />
                    </svg>
                </button>
            </div>

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
                </div>
            </div>

            {/* Overlay */}
            <div
                className={`${isOpen ? 'block' : 'hidden'
                    } fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50`}
            >.</div>

            {/* Mobile menu */}

            <div
                className={`${isOpen ? 'block' : 'hidden'
                    } md:hidden fixed top-0 left-0 w-full h-full bg-white shadow z-50`}
            >
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                    <span className="text-xl font-bold text-gray-800">Menu</span>
                    <button
                        onClick={toggleMenu}
                        className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex-grow py-4">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}