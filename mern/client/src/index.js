import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWithNavbar from './App';
import { AuthProvider } from '../src/auth/AuthContext';

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <AppWithNavbar />
    </AuthProvider>
  </React.StrictMode>
);