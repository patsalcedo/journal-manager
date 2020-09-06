import React from "react";
import "../../../main/main.css";

import axios from "axios";

  function Search() {
  return (
    <div className="pagelayout">
      <div className="SearchPage">
        <h1>Search page</h1>
        <p>This is the search page.</p>
        <div>
      <input type="text" placeholder="Enter item to be searched" />
      </div>
      </div>
    </div>
  );
}


export default Search;
