import React from "react";
import "../main/main.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Nav() {
  const navStyle = {
    color: "white",
  };

  return (
    <nav>
      <h3>
        <a style={navStyle} href="/">
          SEER
        </a>
      </h3>
      <SearchBar />
      <ul className="nav-links">
        <Link style={navStyle} to="/about">
          <li>About</li>
        </Link>
        <Link style={navStyle} to="/">
          <li>Login</li>
        </Link>
        <Link style={navStyle} to="/">
          Create Account
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;