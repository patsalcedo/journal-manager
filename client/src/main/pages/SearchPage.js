import React from "react";
import "../../main/main.css";
import Banner from "../../Components/Banner.js";
import SearchBar from "../../Components/SearchBar";

function Search() {
  return (
    <div className="pagelayout">
      <div className="SearchPage">
        <Banner title="Software Engineering Evidence Repository">
          <SearchBar />
        </Banner>
      </div>
    </div>
  );
}

export default Search;
