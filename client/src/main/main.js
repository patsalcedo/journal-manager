import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/register/register.js";
import Home from "./pages/home/home.js";
import "./main.css";

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
