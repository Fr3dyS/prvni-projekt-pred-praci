import React, { useContext, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AuthNavbarLayout from './Navbar/AuthNavbarLayout';
import { useAuth } from '../../context/AuthProvider';
import { ModeContext } from '../../context/ThemeProvider';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { theme } = useContext(ModeContext);

  return (
    <div className="min-h-screen flex flex-col" >
      <AuthNavbarLayout />
      <div className={`${theme === 'light' ? 'bg-gray-100 text-black' :
        theme === 'dark' ? 'bg-gray-700 text-white' :
          theme === 'red' ? 'bg-red-100' :
            'bg-gray-800'
        }`} >
        {children}
      </div>
    </div>
  );
}
