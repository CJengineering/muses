import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface AuthContextProps {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  authenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  console.log('from provider', authenticated);
  useEffect(() => {
    // Check if there is an access token in the local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Access token found, set authenticated to true
      setAuthenticated(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
