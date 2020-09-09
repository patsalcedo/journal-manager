import React from "react";
import "../main/main.css";
import { Link } from "react-router-dom";
import SeerLogo from "../Images/seerlogov2.png";

function Nav() {
  const navStyle = {
    color: "white",
    fontSize: "20px",
    textDecoration: "none",
  };

  return (
    <nav>
      <Link to="/">
        <img
          className="nav-logo"
          src={SeerLogo}
          width="130"
          height="120"
          alt="Plant a Tree"
        />
      </Link>
      <ul className="nav-links">
        <Link to="/about">
          <li className="nav-links">About</li>
        </Link>
        <Link className="nav-links" to="/register">
          <li className="nav-links">Register</li>
        </Link>
        <Link to="/">
          <li className="nav-links">Login</li>
        </Link>
        <div className="dropdown">
          <Link to="/">
            <li className="nav-links">
              Account<i class="fa fa-caret-down"></i>
            </li>
          </Link>
          <div className="dropdown-content">
            <Link to="/">
              <li className="dropdown-nav-links">Saved Searches</li>
              <li className="dropdown-nav-links">Account Settings</li>
              <li className="dropdown-nav-links">Logout</li>
            </Link>
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
