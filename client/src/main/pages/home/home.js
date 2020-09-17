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
    this.props.history.push("/login");
  }
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
            <button onClick={() => this.handleLogOutClick()}>Log Out</button>
          </Banner>
          <h1>Welcome to SEER</h1>
          <h2>Featured Papers</h2>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
