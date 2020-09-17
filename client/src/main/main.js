import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/register/register.js";
import Home from "./pages/home/home.js";
import "./main.css";
import Nav from "../Components/Nav";
// import Footer from "../Components/Footer";
import About from "./pages/About";
import SearchPage from "./pages//search/SearchPage";
import Login from "./pages/login/login";
import Add from "./pages/add-document/add-document";
import axios from "axios";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: "false",
      userData: {},
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.getUserDataByEmail = this.getUserDataByEmail.bind(this);
  }

  componentDidMount() {
    console.log("Main.js isLoggedIn state: ", this.state.isLoggedIn);
    if (this.state.isLoggedIn === "false") {
      this.checkLoginStatus();
    }
  }

  getUserDataByEmail(userEmail, localStorageToken) {
    console.log(
      "getting user data from main.js: ",
      userEmail,
      localStorageToken
    );
    var payload = {
      email: userEmail,
    };
    axios({
      url: "/api/usercontroller/getuserdata",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
      data: payload,
    })
      .then((response) => {
        this.setState({
          userData: response.data.userdata,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkLoginStatus() {
    var getlocalstoragevalue = localStorage.getItem("token");
    var payload = {
      token: getlocalstoragevalue,
    };
    axios({
      url: "/api/usercontroller/validatetoken",
      method: "POST",
      data: payload,
    })
      .then((resp) => {
        if (resp.data.loginStatus === "true") {
          this.setState({
            isLoggedIn: "true",
          });
          this.getUserDataByEmail(
            resp.data.verifiedresponse.name,
            getlocalstoragevalue
          );
        }
        if (resp.data.loginStatus === "false") {
          this.setState({
            isLoggedIn: "false",
          });
          localStorage.removeItem("token");
          this.props.history.push("/login");
        }
      })
      .catch((err) => {
        console.log("Internal server error" + err);
      });
  }

  handleLogOut() {
    this.setState({
      isLoggedIn: "false",
      userData: [],
    });
    console.log("logging out....");
    localStorage.removeItem("token");
  }

  handleLogIn(data) {
    this.setState({
      isLoggedIn: "true",
      userData: data.userdata,
    });
    localStorage.setItem("token", data.token);

    console.log("logging in from main.js ", this.state.userData);
  }

  render() {
    return (
      <div className="main">
        <Router>
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  handleLogOut={this.handleLogOut}
                />
              )}
            />
            <Route
              path="/home"
              exact
              render={(props) => (
                <Home
                  {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  handleLogOut={this.handleLogOut}
                />
              )}
            />
            <Route
              path="/register"
              exact
              render={(props) => (
                <Register {...props} isLoggedIn={this.state.isLoggedIn} />
              )}
            />
            <Route
              path="/about"
              render={(props) => (
                <About {...props} isLoggedIn={this.state.isLoggedIn} />
              )}
            />
            {/* <Route
              path="/searchpage"
              render={(props) => (
                <SearchPage {...props} isLoggedIn={this.state.isLoggedIn} />
              )}
            /> */}
            <Route
              path="/searchpage"
              render={(props) => <SearchPage {...props} />}
            />
            <Route
              path="/add-document"
              render={(props) => (
                <Add {...props} isLoggedIn={this.state.isLoggedIn} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} handleLogIn={this.handleLogIn} />
              )}
            />
          </Switch>
          {/* <Footer /> */}
        </Router>
      </div>
    );
  }
}

export default Main;
