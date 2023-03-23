import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

type MenuItem = {
    title: string;
    link: string;
};

export default function AuthNavbarLayout({ darkMode }: { darkMode: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { logout } = useAuth();
    const { user } = useAuth();
    const toggle = () => setIsOpen(prevState => !prevState);

    const bgColor = darkMode ? 'bg-gray-500' : 'bg-slate-400';
    const textColor = darkMode ? 'text-gray-200' : 'text- -700';
    const bgTextColor = darkMode ? 'bg-gray-700' : 'bg-gray-700';

    return (
        <nav className="bg-gray-800 py-2 md:py-4">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between">
                <div className="md:flex md:flex-col md:items-start md:justify-center">
                    <Link to="/" className="text-white font-bold text-xl mb-2 md:mb-0">
                        Můj web
                    </Link>
                    <div className="hidden md:block">
                        <Link to="/value1" className="text-gray-300 py-2 px-4 hover:text-white">
                            Hodnota 1
                        </Link>
                        <Link to="/value2" className="text-gray-300 py-2 px-4 hover:text-white">
                            Hodnota 2
                        </Link>
                        <Link to="/value3" className="text-gray-300 py-2 px-4 hover:text-white">
                            Hodnota 3
                        </Link>
                    </div>
                </div>
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
                    <div>
                        Přihlášen jako: {user?.username}
                    </div>
                    <button type='button' onClick={logout} className='text-white py-2 px-4 ml-4 hover:text-gray-300 bg-white text-zinc-900 rounded text-slate-900 text-stone-900 hover:text-zinc-600'>
                        logout
                    </button>
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