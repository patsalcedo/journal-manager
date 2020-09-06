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
      </ul>
    </nav>
  );
}

export default Nav;
