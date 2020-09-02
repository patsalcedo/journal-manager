import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./pages/register";
import Home from "./pages/home";
import "./index.css";

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
