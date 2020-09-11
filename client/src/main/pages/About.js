import React from "react";
import "../../main/main.css";
// import SeerLogo from "../../Images/seerlogov2black.png";

function About(props) {
  return (
    <div className="pagelayout">
      <div className="container">
        <h1>About Us</h1>
        {/* <img src={SeerLogo} alg="logo"></img> */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}

export default About;
