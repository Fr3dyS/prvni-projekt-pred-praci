/**
 * Komponenta reprezentuje layout pro nepřihlášenou část aplikace
 */
import UnauthNavbarhLayout from './Navbar/UnauthNavbarhLayout';
import React, { ReactNode } from 'react';


interface InauthLayoutProps {
  children: ReactNode;
}

export default function UnauthLayout({ children }: InauthLayoutProps) {
  return (
    <div>
      <UnauthNavbarhLayout />
      {children}
    </div>
  );
}
