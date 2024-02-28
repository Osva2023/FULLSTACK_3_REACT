// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import AgentList from '../src/components/agentList';
import UnauthorizedPage from '../src/components/unnauthorized.js';
import { Login } from '../src/components/Login';
import Edit from '../src/components/edit';
import Create from '../src/components/create';
import HomeComponent from './components/Home.js';
import TransactionPage from './components/Transaction.js';
import Navbar from './components/navbar'; // Importa tu componente Navbar
import './components/style.css';

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

// Usa el componente Navbar aquí, fuera del AuthProvider
const AppWithNavbar = () => {
  const { user, logout } = useAuth();
  const firstName = user ? user.first_name : null;   // obtain the first name from user object

  return (
    <Router>
      <div>
        <Navbar userFirstName={firstName} logout={logout} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/agent-list" element={<AgentList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/transaction/" element={<TransactionPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppWithNavbar;

