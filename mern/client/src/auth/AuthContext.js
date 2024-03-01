// AuthContext.js

import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Adjust according to your authentication logic
  
  
  const login = (email, password, navigate) => {
    
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);                          // debugin pruposes
        if (data.status === 'ok') {
          // Store the token
          const token = data.sessionToken;
          console.log('Token:', token);              // debugin pruposes
          resolve({
            userId: data.user_id,
            token
          });
        } else {
          reject(new Error(data.message));
        }
      }) // This was missing
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
    });
  };

  const logout = () => {
    // Implementa la lógica de cierre de sesión aquí
    // Por ejemplo, simplemente establece el usuario en null
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}