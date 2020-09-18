import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../../../main/main.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {
        userName: "",
        password: "",
      },
      message: "",
      redirect: false,
    };
  }

  //When user putting inputs in login form,
  //checking invalid inputs or not.
  handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (id) {
      case "userName":
        formErrors.userName =
          value.length <= 1 ? "Minimum 2 Characters Required" : {};
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 Characters Required" : {};
        break;
      default:
        break;
    }
    this.setState({ formErrors, [id]: value });
  };

  onLogin = (event) => {
    event.preventDefault();
    const payload = {
      username: this.state.userName,
      password: this.state.password,
    };

    axios({
      url: "/api/usercontroller/login",
      method: "POST",
      data: payload,
    })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.loginStatus === "true") {
          this.props.handleLogIn(resp.data);
          this.props.history.push("/home");
        }
        if (resp.data.loginStatus === "false") {
          console.log("Login Failed", resp.data.message);
        }

        //this.resetUserInputs();
      })
      .catch((err) => {
        console.log("Internal server error" + err);
      });
  };

  // componentDidMount = () => {
  //   console.log("calling from Login.js:", this.props.isLoggedIn);
  //   if (this.props.isLoggedIn === "true") {
  //     this.props.history.push("/home");
  //     console.log("navigating to homepage since isLoggedin is true");
  //   }
  // };

  // axios({
  //   url: "/api/usercontroller/login",
  //   method: "POST",
  //   data: payload,
  // })
  //   .then(resp => {
  //     console.log(resp.data);
  //     this.resetUserInputs();
  //     //this.getBlogPost();
  //   })
  //   .catch(() => {
  //     console.log("Internal server error");
  //   });

  render() {
    const { formErrors } = this.state;

    if (this.state.redirect) {
      return <Redirect push to="/home" />;
    }

    //JSX
    return (
      <div className="pagelayout">
        <div className="container">
          <h2>Seer User Login</h2>
          <form onSubmit={this.onLogin}>
            <div className="form-input">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                id="userName"
                placeholder="User Name"
                value={this.state.userName}
                onChange={this.handleChange}
              />
              {formErrors.userName.length > 0 && (
                <span className="errorMessage">{formErrors.userName}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <button className="submitBtn">Submit</button>
            <span>{this.state.message}</span>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
