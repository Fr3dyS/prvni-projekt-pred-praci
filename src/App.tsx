import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import LoginScreen from './pages/LoginScreen';
import TestScreen from './pages/TestScreen';
import OverviewScreen from './pages/OverviewScreen';
import { routes } from './utils/routes';
import UserListScreen from './pages/UserListScreen';
import RegisterScreen from './pages/RegisterScreen';
import DetailUserScreen from './pages/DetailUserScreen';
import NewUserScreen from './pages/NewUserScreeen';
import EditUserScreen from './pages/EditUserScreen';
import AuthLayout from './components/layout/AuthLayout';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* detail uživatele */}
          <Route path='/users/:id' element={<PrivateRoute component={<DetailUserScreen />} />} />{' '}
          {/* nový uživatel - restricted */}
          <Route path='/users/new' element={<PrivateRoute component={<NewUserScreen />} />} />{' '}
          {/* edit uživatele - restricted */}
          <Route path='/users/edit/:id' element={<PrivateRoute component={<EditUserScreen />} />} />{' '}
          {/* registrace uzivatelu - restricted */}
          <Route path='/register' element={<RegisterScreen />} />{' '}
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
