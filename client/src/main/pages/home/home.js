import React, { Component } from "react";
import "../../../main/main.css";
import "./home.css";
// import { Button } from "@material-ui/core";
import Banner from "../../../Components/Banner.js";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  // handleLogOutClick() {
  //   this.props.handleLogOut();
  //   this.props.history.push("/home");
  // }

  render() {
    let bannerContent;
    bannerContent = (
      <>
        <h2>Find papers now!</h2>
        <Link className="nav-links" to="/searchpage">
          <button className="btn">Search</button>
        </Link>
      </>
    );

    return (
      <div>
        <div className="pagelayout">
          <h1>Welcome to SEER</h1>
          <Banner title="Software Engineering Evidence Repository">
            {bannerContent}
          </Banner>
        </div>
      </div>
    );
  }
}

export default Home;
