
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
  // TODO: doplňte potřebné props

/**
 * Komponenta reprezentuje layout pro přihlášenou část aplikace
 */

export default function AuthLayout() {
  // TODO: implementujte layout pro přihlášenou část aplikace (stránky: overview, user list, user detail, create/edit user)
  /*
    TODO: vytvořený layout aplikujte tam, kde je třeba (viz stránky o řádek výše)
    layout by měl obsahovat:
    - side menu: boční menu s možností navigace na jednotlivé stránky v administrace (přehled, seznam uživatelů) + možnost odhlášení uživatele
    - content: hlavní část stránky do které se bude renderovat obsah jednotlivých stránek
    - někde by se také měla objevit informace o tom, jaký uživatel je aktuálně přihlášený (často je zobrazování pomocí jména + obrázku/iniciálů uživatele, 
      nebo jen obrázkem/iniciály a po kliknutí se zobrazí jméno + často možnost odhlášení)
      -> v auth contextu je k dispozici objekt `user`
  */
  // TODO: pro side menu vytvořte vlastní komponentu - menu by mělo uživateli ukazovat, kde se aktuálně nachází (která stránka je aktivní)

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                Home 
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/users"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Users
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
