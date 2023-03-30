import { useContext, useEffect, useRef, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../context/AuthProvider';
import { ModeContext } from '../../../context/ThemeProvider';
import Lightswitch from './Lightswitch';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function AuthNavbarLayout() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { logout } = useAuth();
    const { user } = useAuth();
    const toggle = () => setIsOpen(prevState => !prevState);
    const { theme } = useContext(ModeContext);



    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };


    return (
        <nav className={`${theme === 'light' ? 'bg-gray-800' :
            theme === 'dark' ? 'bg-gray-900' :
                theme === 'red' ? 'bg-red-800' :
                    'bg-gray-800'
            }`}>
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
                </div>
                <div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Profile
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-48 bg-gradient-to-t from-gray-800 to-gray-700 rounded-md shadow-lg animate-slide-in">
                                <div className="py-1">
                                    <Menu.Item>
                                        <div className="p-4">
                                            <span className="block font-bold text-white mb-2">Přihlášen jako:</span>
                                            <span className="block text-gray-200">{user?.username}</span>
                                        </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <div className="p-4">
                                            <span className="block font-bold text-white mb-2">Role:</span>
                                            <span className="block text-gray-200">{user?.role}</span>
                                        </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <div className="p-4">
                                            <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full border border-gray-400 transition duration-300 ease-in-out" onClick={logout}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L5.586 11H15a1 1 0 010 2H5a1 1 0 01-.707-.293z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M10 4a1 1 0 011 1v8a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                Log out
                                            </button>
                                        </div>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <Lightswitch />
            </div>
        </nav>
    );
}