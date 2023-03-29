import React from 'react';
import { ThemeProvider } from 'react-admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import { routes } from './utils/routes';

function App() {
  return (
    <ThemeProvider theme={ThemeProvider}>
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
    </ThemeProvider>
  );
}

export default App;