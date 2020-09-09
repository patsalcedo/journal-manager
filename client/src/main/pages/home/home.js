import React, { Component } from "react";
import "../../../main/main.css";
// import { Button } from "@material-ui/core";
import Banner from "../../../Components/Banner.jsx";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  handleLogOutClick(){
    this.props.handleLogOut();    
    this.props.history.push("/login");
  }
  render() {
    return (
      <div className="pagelayout">
        <Banner title="Software Engineering Evidence Repository">
          <button onClick={() => this.handleLogOutClick()}>Log Out</button>
          <Link to="/searchpage" className="btnBanner">
            Search
          </Link>
          <Link to="/" className="btnBanner">
            Browse
          </Link>
        </Banner>
      </div>
    );
  }
}

export default Home;
