import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import { routes } from './utils/routes';
import customTheme from './components/themes/custom';
import darkTheme from './components/themes/dark';
import lightTheme from './components/themes/light';
import DarkModeProvider from './context/ThemeProvider';

function App() {
  const [themeMode, setThemeMode] = React.useState('light');

  const getTheme = () => {
    switch (themeMode) {
      case 'light':
        return lightTheme;
      case 'dark':
        return darkTheme;
      case 'red':
        return customTheme;
      default:
        return lightTheme;
    }
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeMode(event.target.value);
  };

  return (
    <DarkModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.restricted ? (
                    <PrivateRoute component={<route.component />} />
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </DarkModeProvider>
  );
}

export default App;
