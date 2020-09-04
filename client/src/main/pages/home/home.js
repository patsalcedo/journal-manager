import React, { Component } from "react";
import "./home.css";
import { Button } from "@material-ui/core";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="btn">
        <Button variant="outlined">Register</Button>
      </div>
    );
  }
}

export default Home;
