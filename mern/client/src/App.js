// App.js

import React from 'react';
import {   Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import AgentList from '../src/components/agentList';
import UnauthorizedPage from '../src/components/unnauthorized.js';
import {Login} from '../src/components/Login';
import Edit from '../src/components/edit';
import Create from '../src/components/create';
import './components/style.css';

function App() {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      
    </AuthProvider>
  );
}

function HomePage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <AgentList /> : <Login />;
}

export default App;
