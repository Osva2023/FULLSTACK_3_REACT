import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useLogout } from "../auth/withAuthProtection";
export default function Navbar() {
  const [cookies] = useCookies(["userFirstName", "userLastName"]);
  const userFirstName = cookies.userFirstName;
  const userLastName = cookies.userLastName;
  const logout = useLogout();

  // RENDER THE NAVBAR
  return (
    <div className="navbar-custom">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/home">
          <img
            style={{ width: "200px", marginRight: "430px" }}
            src="/rocketLogo.png"
            alt="Rocket logo"
          ></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div
                className="nav-link btn-outline-primary"
                style={{ color: "#0a65a0", fontSize: "30px" }}
              >
                Rocket Elevator Admin Page
              </div>
            </li>
            {userFirstName && userLastName && (
              <li
                className="nav-item"
                style={{ fontSize: "20px", marginLeft: "200px" }}
              >
                <div
                  className="nav-link btn-outline-primary"
                  style={{ color: "#a52a52", fontSize: "25px" }}
                >
                  <div>
                    {" "}
                    <FaUser /> Welcome,{" "}
                  </div>
                  <div>
                    {userFirstName} {userLastName}
                  </div>
                </div>
                <button className="logout-button" onClick={logout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
