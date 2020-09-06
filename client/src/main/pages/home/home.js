import React, { Component } from "react";
import "../../../main/main.css";
import { Button } from "@material-ui/core";
import Banner from "../../../Components/Banner.jsx";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="pagelayout">
        <Banner title="Software Engineering Evidence Repository">
          <Link to="/searchpage" className="btnBanner">
            Search
          </Link>
          <Link to="/" className="btnBanner">
            Browse
          </Link>
        </Banner>
      </div>
    );
  }
}

export default Home;
