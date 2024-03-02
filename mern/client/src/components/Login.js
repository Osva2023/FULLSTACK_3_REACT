import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCookies } from "react-cookie";
import { BootstrapErrorToast } from "./Alerts";
import { storeSession } from "./Session";

// FUNCTION TO LOGIN THE USER
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const { user, login, setUser } = useAuth();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [cookies, setCookie] = useCookies(["sessionToken"]);

  const navigate = useNavigate();
  const sessionToken = cookies ? cookies.sessionToken : null;


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit is called"); // debugin pruposes

    login(email, password, navigate)
      .then(({ userId }) => {
        console.log("userId:", userId); // debugin pruposes
        console.log("logged in"); // debugin pruposes

        storeSession(userId) 
          .then((data) => {
            

            setCookie("sessionToken", data.data.token, {
              path: "/",
              maxAge: 86400,
            });
            setLoginFailed(false);

            setUser({ userId, token: data.data.token });
            navigate("/home");
          })
          .catch((err) => {
            
          });
      })
      .catch((err) => {
        console.log("Login failed:", err);
        setLoginFailed(true);
        setShowErrorToast(true);
        
      });
  };

  if (loginFailed) {
    return <Navigate to="/unauthorized" />;
  }
  // Render the login form
  return (
    <div>
      <div className="toast-container">
        {showErrorToast && (
          <BootstrapErrorToast
            message="Login failed. Please try again."
           onClose={() => setShowErrorToast(false)}
              
          />
        )}
      </div>

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
                  *Your email is required for authentication purposes only. We
                  take data security seriously.
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
    </div>
  );
}
