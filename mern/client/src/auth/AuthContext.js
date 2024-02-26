// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Replace this with your actual API call
      fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            setLoggedIn(true);
            setLoginStatus(!loginStatus); // Actualiza el estado de login
            resolve();
          } else {
            response.json().then((data) => reject(data.error));
          }
        })
        .catch((err) => reject(err.message));
    });
  };
  const logout = () => {
    // Implementa la lógica de cierre de sesión aquí
    // Por ejemplo, simplemente establece loggedIn en false
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, loginStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
