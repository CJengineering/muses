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
  const [authChecked, setAuthChecked] = useState(false); // New state variable

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('An error occurred during authentication check:', error);
      } finally {
        setAuthChecked(true); // Mark authentication check as completed
      }
    };

    checkAuthentication();
  }, []);

  if (!authChecked) {
    return null; // Render a loading state while the authentication check is in progress
  }

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

