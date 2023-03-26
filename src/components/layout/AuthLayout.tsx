import React, { useContext, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AuthNavbarLayout from './Navbar/AuthNavbarLayout';
import { useAuth } from '../../context/AuthProvider';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col" >
      <AuthNavbarLayout />
      <div className="flex-grow overflow-y-auto" >
        {children}
      </div>
    </div>
  );
}
