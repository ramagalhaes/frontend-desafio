import React from 'react';
import { string } from 'yup';

import api from '../services/api';

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthState {
  username: string;
  authorization: string;
}

interface AuthContextData {
  username: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = React.createContext({} as AuthContextData);

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error();
  }
  return context;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<AuthState>(() => {
    const username = window.localStorage.getItem('username');
    const authorization = window.localStorage.getItem('authorization');

    if (authorization && username) {
      return { username, authorization };
    }
    return {} as AuthState;
  });
  const signIn = React.useCallback(async ({ username, password }) => {
    const response = await api.post('/login', {
      username,
      password,
    });
    const { authorization } = response.headers;
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('authorization', authorization);
    setData({ username, authorization });
  }, []);

  const signOut = React.useCallback(() => {
    window.localStorage.removeItem('authorization');
    window.localStorage.removeItem('username');
  }, []);

  return (
    <AuthContext.Provider value={{ username: data.username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
