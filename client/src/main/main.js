import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/register/register.js";
import Home from "./pages/home/home.js";
import "./main.css";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import About from "./pages/About";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/login/login.js";

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/about" component={About} />
            <Route path="/searchpage" component={SearchPage} />
            <Route path="/login" component={Login} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default Main;
