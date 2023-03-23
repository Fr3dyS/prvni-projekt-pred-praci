import React, { useContext, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AuthNavbarLayout from './Navbar/AuthNavbarLayout';
import { useAuth } from '../../context/AuthProvider';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-2 md:border-b py-2">
        <div className="container mx-auto">
          <div className="flex justify-between gap-2">
            <img
              className="w-32 ml-2"
              src="https://refine.dev/img/refine_logo.png"
              alt="Logo"
            />
            <ul className="hidden md:flex">
              {menuItems.map(({ name, route }) => (
                <li key={name} className="float-left">
                  <Link
                    className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 mt-2 capitalize
                                decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out"
                    to={name}
                  >
                    <span className="text-green-500">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );

}
