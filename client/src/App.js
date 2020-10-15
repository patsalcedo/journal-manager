import React, { Component } from "react";
import "./App.css";
import Main from "./main/main.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./main/pages/search/SearchPage.js"

class App extends Component {
  render() {
    return (
      <Router>
      <div className="app">
        <Main />
        <Route exact path="/searchpage" component={SearchPage}/>
      </div>
      </Router>
    );
  }
}

export default App;
