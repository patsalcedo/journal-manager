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
      <h1>
        <Link style={navStyle} to="/">
          SEER
        </Link>
      </h1>
      <SearchBar />
      <ul className="nav-links">
        <Link style={navStyle} to="/about">
          <li>About</li>
        </Link>
        <Link style={navStyle} to="/register">
          <li>Register</li>
        </Link>
        <Link style={navStyle} to="/login">
          <li>Login</li>
        </Link>
        <Link style={navStyle} to="/">
          Sign In
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
