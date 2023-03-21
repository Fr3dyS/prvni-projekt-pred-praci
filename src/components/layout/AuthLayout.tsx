import React, { useContext, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AuthProvider from '../../context/AuthProvider';
import AuthNavbarLayout from './Navbar/AuthNavbarLayout';

type Props = {
  children: ReactNode;
};


export default function Layout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user, logout } = useContext(AuthProvider);
  //  const history = useHistory();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    //  logout();
    // history.push('/login');
  };

  return (
    <div>
      <AuthNavbarLayout />
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8" >
        <div>{children}</div>
      </main>
    </div>
  );
}
