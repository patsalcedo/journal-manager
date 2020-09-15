import React from "react";
import "../main/main.css";
import { Link } from "react-router-dom";
import SeerLogo from "../Images/seerlogov2.png";

function Nav() {
  // const navStyle = {
  //   color: "white",
  //   fontSize: "20px",
  //   textDecoration: "none",
  // };

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
      <Link className="nav-links" to="/about">
        <button className="nav-btn">About</button>
      </Link>
      <Link className="nav-links" to="/register">
        <button className="nav-btn">Register</button>
      </Link>
      <Link to="/login">
        <button className="nav-btn">Login</button>
      </Link>
      <Link to="/add-document">
        <button className="nav-btn">Add document</button>
      </Link>
      <div className="dropdown">
        <Link to="/">
          <button className="nav-btn">
            Account<i class="fa fa-caret-down"></i>
          </button>
        </Link>
        <div className="dropdown-content">
          <ul>
            <Link to="/">
              <li className="dropdown-nav-links">Saved Searches</li>
              <li className="dropdown-nav-links">Account Settings</li>
              <li className="dropdown-nav-links">Logout</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
