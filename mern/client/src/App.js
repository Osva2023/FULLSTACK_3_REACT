// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";

import AgentList from "../src/components/agentList";
import UnauthorizedPage from "../src/components/unnauthorized.js";
import { Login } from "../src/components/Login";
import Edit from "../src/components/edit";
import Create from "../src/components/create";
import HomeComponent from "./components/Home.js";
import TransactionPage from "./components/Transaction.js";
import Navbar from "./components/navbar"; // Importa tu componente Navbar
import "./components/style.css";
import { withAuthProtection } from "./auth/withAuthProtection";

function App() {
  return (
    <AuthProvider>
      {/*<ValidateTokenOnNav /> */}
      <Outlet />
    </AuthProvider>
  );
}

// FUNCTION TO RENDER THE APP WITH THE NAVBAR
const AppWithNavbar = () => {
  const { user, logout } = useAuth();
  const firstName = user ? user.first_name : null; // obtain the first name from user object
  const ProtectedHomeComponent = withAuthProtection(HomeComponent);
  const ProtectedAgentList = withAuthProtection(AgentList);
  const ProtectedEdit = withAuthProtection(Edit);
  const ProtectedCreate = withAuthProtection(Create);
  const ProtectedTransactionPage = withAuthProtection(TransactionPage);
  return (
    <AuthProvider>
      <Router>
        {/*<ValidateTokenOnNav /> */}
        <div>
          <Navbar userFirstName={firstName} logout={logout} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedHomeComponent />} />
            <Route path="/agent-list" element={<ProtectedAgentList />} />
            <Route path="/edit/:id" element={<ProtectedEdit />} />
            <Route path="/create" element={<ProtectedCreate />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
              path="/transaction/"
              element={<ProtectedTransactionPage />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};
export default AppWithNavbar;
