// AuthContext.js
// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Ajusta según tu lógica de autenticación

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Reemplaza esto con tu llamada API real
      fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              const { first_name, ...otherUserData } = data; // Extraer first_name y otros datos del usuario si los hay
              setUser({ first_name, ...otherUserData });
              resolve();
            });
          } else {
            response.json().then((data) => reject(data.error));
          }
        })
        .catch((err) => reject(err.message));
    });
  };

  const logout = () => {
    // Implementa la lógica de cierre de sesión aquí
    // Por ejemplo, simplemente establece el usuario en null
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
