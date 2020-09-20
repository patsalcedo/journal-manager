import React, { Component } from "react";
import "../../../main/main.css";
import "./home.css";
// import { Button } from "@material-ui/core";
import Banner from "../../../Components/Banner.js";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogOutClick() {
    this.props.handleLogOut();
    this.props.history.push("/home");
  }

  render() {
    let bannerContent;
    if (this.props.isLoggedIn === "true")
      bannerContent = (
        <>
          <h2>Find papers now!</h2>
          <Link className="nav-links" to="/searchpage">
            <button className="btn">Search</button>
          </Link>
        </>
      );
    else
      bannerContent = (
        <>
          <Link className="nav-links" to="/login">
            <button className="btn">Login</button>
          </Link>
          <Link className="nav-links" to="/register">
            <button className="btn">Register</button>
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
          {/* <h2>Featured Papers</h2>
          <div className="column">
            <div className="container">
              <h1>Paper 1</h1>
            </div>
          </div>
          <div className="column">
            <div className="container">
              <h1>Paper 2</h1>
            </div>
          </div>
          <div className="column">
            <div className="container">
              <h1>Paper 3</h1>
            </div>
          </div>
          <div className="column">
            <div className="container">
              <h1>Paper 1</h1>
            </div>
          </div>
          <div className="column">
            <div className="container">
              <h1>Paper 2</h1>
            </div>
          </div>
          <div className="column">
            <div className="container">
              <h1>Paper 3</h1>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Home;
