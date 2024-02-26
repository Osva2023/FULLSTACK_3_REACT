import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const { loggedIn, login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => {
        console.log('logged in');
      })
      .catch((err) => {
        console.log(err);
        setLoginFailed(true); // Move this inside the .catch block
      });
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  if (loginFailed) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center">Rocket Admin Login</h2>
          <p className="text-muted text-center">
            Please provide credentials to access Rocket Admin Page
          </p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
              *Your email is required for authentication purposes only. We take data security seriously.
              </small> 
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}