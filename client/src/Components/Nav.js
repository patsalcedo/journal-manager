import React from "react";
import "../main/main.css";
import { Link, useHistory } from "react-router-dom";
import SeerLogo from "../Images/seerlogov2.png";
// import { Popover, Menu, Position, Button } from "evergreen-ui";

function Nav(props) {
  let history = useHistory();
  const handleLogOutClick = () => {
    props.handleLogOut();
    history.push("/home");
  };

  // var sampleLink = <Link to="/about">About</Link>;

  return props.isLoggedIn === "true" ? (
    <nav>
      <Link to="/">
        <img
          className="nav-logo"
          src={SeerLogo}
          width="130"
          height="120"
          alt="Plant a Tree"
        />
      </Link>
      <Link to="/about">
        <button className="nav-btn">About</button>
      </Link>
      <Link to="/searchpage">
        <button className="nav-btn">Search</button>
      </Link>
      <Link to="/add-document">
        <button className="nav-btn">Add document</button>
      </Link>
      <button className="nav-btn" onClick={() => handleLogOutClick()}>
        Log Out
      </button>
      {/* <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item onSelect={sampleLink}>Saved Searches</Menu.Item>
              <Menu.Item onSelect={sampleLink}>Account Settings</Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
              <Menu.Item onSelect={sampleLink}>Logout</Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <Button marginRight={16}>Without Icons</Button>
      </Popover> */}
      <div className="dropdown">
        <Link to="/">
          <button className="nav-btn">
            Account<i class="fa fa-caret-down"></i>
          </button>
        </Link>
        <div className="dropdown-content">
          <ul>
            <Link to="/">
              <li className="dropdown-nav-links">Saved Searches</li>
              <li className="dropdown-nav-links">Account Settings</li>
              <li className="dropdown-nav-links">Logout</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  ) : (
    <nav>
      <Link to="/">
        <img
          className="nav-logo"
          src={SeerLogo}
          width="130"
          height="120"
          alt="Plant a Tree"
        />
      </Link>
      <Link to="/about">
        <button className="nav-btn">About</button>
      </Link>
      <Link to="/register">
        <button className="nav-btn">Register</button>
      </Link>
      <Link to="/login">
        <button className="nav-btn">Login</button>
      </Link>
    </nav>
  );
}

export default Nav;
