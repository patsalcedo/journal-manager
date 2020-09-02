import React from "react";
import "../main/main.css";
import { Link } from "react-router-dom";

function SearchBar() {
  const navStyle = {
    color: "white",
  };

  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        // onChange={(e) => setQuery(e.target.value)}
        // value={query}
        // onKeyPress={search}
      />
    </div>
  );
}

export default SearchBar;
