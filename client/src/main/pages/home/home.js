import React, { Component } from "react";
import "../../../main/main.css";
import "./home.css";
// import { Button } from "@material-ui/core";
import Banner from "../../../Components/Banner.js";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home">
        <div className="pagelayout">
          <Banner title="Software Engineering Evidence Repository">
            <Link to="/" className="btn">
              Sign In
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
            <Link to="/searchpage" className="btn">
              Search [temp]
            </Link>
          </Banner>
        </div>
      </div>
    );
  }
}

export default Home;
