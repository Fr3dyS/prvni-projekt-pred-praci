import React from 'react';
import { Link } from 'react-router-dom';

export default function ErorrpageScreen() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl font-medium text-gray-600 mb-8">Stránka nebyla nalezena</p>
            <Link to={'/'}>
                <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300 ease-in-out">
                    Zpět na úvodní stránku
                </button>
            </Link>
        </div >
    )
}

// Toto je komponenta pro 404 chybovou stránku
// Využívá se při pokusu o přístup na neexistující stránku
// Obsahuje nadpis s kódem chyby, textové upozornění a tlačítko pro návrat na úvodní stránku.
// Používá styly z frameworku Tailwind.