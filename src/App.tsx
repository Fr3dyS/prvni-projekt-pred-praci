import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import LoginScreen from './pages/LoginScreen';
import OverviewScreen from './pages/OverviewScreen';
import { routes } from './utils/routes';
import UserListScreen from './pages/UserListScreen';
import RegisterScreen from './pages/RegisterScreen';
import NewUserScreen from './pages/NewUserScreeen';
import EditUserScreen from './pages/EditUserScreen';
import ErorrpageScreen from './pages/404pageScreen';
import DetailUserScreen from './pages/DetailUserScreen';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* nový uživatel - restricted */}
          <Route path='/users/new' element={<PrivateRoute component={<NewUserScreen />} />} />{' '}
          {/* edit uživatele - restricted */}
          <Route path='/users/edit/:id' element={<PrivateRoute component={<EditUserScreen />} />} />{' '}
          {/* registrace uzivatelu */}
          <Route path='/register' element={<RegisterScreen />} />{' '}
          {/* stránka, která nevyžaduje přihlášeného uživatele */}
          <Route path='/login' element={<LoginScreen />} />{' '}
          {/* stránka, která vyžaduje přihlášeného uživatele - tzn. "restricted" */}
          <Route path='/' element={<PrivateRoute component={<OverviewScreen />} />} />{' '}
          {/* tabulka uzivatelu */}
          <Route path='/users' element={<PrivateRoute component={<UserListScreen />} />} />{' '}
          {/* detail uzivatelu */}
          <Route path='/users/detail/:id' element={<PrivateRoute component={<DetailUserScreen />} />} />{' '}
          {/* 404: Not Found stranka */}
          <Route path='*' element={<ErorrpageScreen />} />{' '}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
