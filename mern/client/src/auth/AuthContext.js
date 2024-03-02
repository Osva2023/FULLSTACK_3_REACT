
// DEPENDENCIES
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// FUNCTION TO SET A PROVIDER FOR AUTHENTICATION
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 

  const login = (email, password, navigate) => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          
          if (data.status === "ok") {
            
            const token = data.sessionToken;
            
            resolve({
              userId: data.user_id,
              token,
            });
          } else {
            reject(new Error(data.message));
          }
        }) 
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// EXPORTING THE FUNCTION TO USE THE AUTHENTICATION
export function useAuth() {
  return useContext(AuthContext);
}
