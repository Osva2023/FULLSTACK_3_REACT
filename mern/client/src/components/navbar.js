import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
 export default function Navbar({userFirstName}) {
  return (
    <div className="navbar-custom"> 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img style={{width : "200px", marginRight: "430px"}} src="/rocketLogo.png" alt="Rocket logo"></img>
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
              <div className="nav-link btn-outline-primary" style={{ color: '#0a65a0', fontSize: '30px' }} >
                Rocket Elevator Admin Page
              </div>
            </li>
            {userFirstName && ( // Only display this li if userFirstName is not null
              <li className="nav-item" style={{ fontSize: '20px', marginLeft: '200px' }} >
                <div className="nav-link btn-outline-primary" style={{ color: '#a52a52a', fontSize: '30px' }} >
                  <FaUser /> Welcome, {userFirstName} 
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}