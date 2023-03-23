/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { httpGet } from '../utils/http-client';
import jwtDecode from 'jwt-decode';
import Keys from '../utils/keys';
import { User } from '../types/user.types';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface TokenData {
  user: User;
  iat: number;
  exp: number;
}

// výchozí hodnoty kontextu
const defaultValues: AuthContextType = {
  user: null,
  token: null,
  isAuthenticated: false,
  login: (token: string) => { },
  logout: () => { },
};

// vytvoření kontextu pro udržení globálního stavu aplikace (pro držení informace o přihlášení)
const AuthContext = createContext<AuthContextType>(defaultValues);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useLocalStorage<User | null>(Keys.USER, null);
  const [token, setToken] = useLocalStorage<string>(Keys.ACCESS_TOKEN, '');
  const [isAuthenticated, setAuthenticated] = useLocalStorage<boolean>(
    Keys.IS_AUTHENTICATED,
    false,
  );

  console.log(user);

  // revalidace tokenu po otevření aplikace + odhlášení pokud bude token nevalidní
  const revalidateToken = async () => {
    try {
      const res = await httpGet('auth/refresh-token', {
        headers: { Authorization: token },
      });
      console.log({ revalidateRes: res });
      if (res.status === 200) {
        const token = res.data.payload.accessToken;
        setToken(token);
        parseUserData(token);
      } else {
        logout();
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const parseUserData = (token: string) => {
    const decodedData: TokenData = jwtDecode(token);
    setUser(decodedData.user);
  };

  useEffect(() => {
    revalidateToken();
  }, []);

  // přihlášení uživatele do aplikace
  const login = useCallback((token: string) => {
    setToken(token);
    setAuthenticated(true);
  }, []);

  // odhlášení uživatele z aplikace
  const logout = () => {
    setToken('');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook pro přístup k Auth kontextu */
export const useAuth = () => {
  return useContext(AuthContext);
};

