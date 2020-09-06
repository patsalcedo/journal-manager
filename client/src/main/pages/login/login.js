import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  state = {
    formErrors: {
      userName: "",
      password: "",
    },
    message: "",
    redirect: false,
  };

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
      .then(resp => {
        console.log(resp.data);
        this.resetUserInputs();
      })
      .catch(() => {
        console.log("Internal server error");
      });

    // axios
    // .post("/api/usercontroller/login", {
    //   body:{
    //     username: this.state.userName,
    //     password: this.state.password
    //   }
    // })
    // .then((response) => {
    //   const data = response.data;
    //   //this.setState({ userdata: data });
    //   console.log("Data has been retrieved");
    // })
    // .catch(() => {
    //   alert("Error from Server");
    // });
};   



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
      <div className="app">
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
          <button>submit</button>
          <span>{this.state.message}</span>
        </form>
      </div>
    );
  }
}

export default Login;
