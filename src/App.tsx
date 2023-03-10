import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import LoginScreen from './pages/LoginScreen';
import TestScreen from './pages/TestScreen';
import OverviewScreen from './pages/OverviewScreen';
import { routes } from './utils/routes';
import UserListScreen from './pages/UserListScreen';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 
          TODO: Využijte soubor `utils/routes` pro definování jednotlivých cest v celé aplikaci. 
            Zaintegrujte omezený přístup k routě na základě přihlášeného/nepřihlášeného uživatele a property `restricted` 
            -> `restricted` properta značí zda se jedná o komponentu vyžadující přihlášeného uživatele nebo ne
        */}
          {/* stránka, která nevyžaduje přihlášeného uživatele */}
          <Route path='/login' element={<LoginScreen />} />{' '}
          {/* stránka, která vyžaduje přihlášeného uživatele - tzn. "restricted" */}
          <Route path='/' element={<PrivateRoute component={<OverviewScreen />} />} />{' '}
          <Route path='/users' element={<PrivateRoute component={<UserListScreen />} />} />{' '}
          {/* TODO: připravte 404: Not Found routu pro případy, kdy uživatel zkusí přejít na neexistující URL (využijte souboru s definicemi jednotlivých rout) */}
          <Route path='/test' element={<TestScreen />} />{' '}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
  