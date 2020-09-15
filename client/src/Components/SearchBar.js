import React from "react";
import "../main/main.css";
// import { Link } from "react-router-dom";

function SearchBar() {
  //   const navStyle = {
  //     color: "white",
  //   };

  return (
    <div className="search-bar">
      <form className="search-form">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          // onChange={(e) => setQuery(e.target.value)}
          // value={query}
          // onKeyPress={search}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
