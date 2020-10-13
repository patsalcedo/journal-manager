import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./register.css";
import "../../../main/main.css";

//define sample email to check the email input valid or not
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const dobRegex = RegExp(
  /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/
);

//Error handling for users submit register without putting anything
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Register extends React.Component {
  state = {
    formErrors: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      userrole: "",
      password: "",
    },
    message: "",
    redirect: false,
    userdata: [],
  };

  componentDidMount = () => {
    //this.getBlogPost();
  };

  //When user putting inputs in register form,
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
    case "firstName":
      formErrors.firstName =
          value.length < 2 ? "Minimum 2 Characters Required" : {};
      break;
    case "lastName":
      formErrors.lastName =
          value.length < 2 ? "Minimum 2 Characters Required" : {};
      break;
    case "email":
      formErrors.email = emailRegex.test(value)
        ? {}
        : "Invalid Email Address";
      break;
    case "dob":
      formErrors.dob = dobRegex.test(value)
        ? {}
        : "Invalid Date of Birth Input! Format is DD/MM/YYYY";
      break;
    case "password":
      formErrors.password =
          value.length < 6 ? "Minimum 6 Characters Required" : {};
      break;
    default:
      break;
    }
    // this.setState({ formErrors, [id]: value }, () => console.log(this.state));
    this.setState({ formErrors, [id]: value });
  };

  getUserData = () => {
    axios
      .get("/api/usercontroller/getuser")
      .then((response) => {
        const data = response.data;
        this.setState({ userdata: data });
        console.log("Data has been retrieved");
      })
      .catch(() => {
        alert("Error from Server");
      });
  };

  addUser = (event) => {
    event.preventDefault();
    //var sessionToken = localStorage.getItem('Token');
    this.setState({ message: "" });

    if (formValid(this.state)) {
      const payload = {
        user_name: this.state.userName,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        dob: this.state.dob,
        userrole: this.state.userrole,
        password: this.state.password,
      };

      axios({
        url: "/api/usercontroller/newregistereduser",
        method: "POST",
        data: payload,
      })
        .then((resp) => {
          console.log(resp.data);
          this.resetUserInputs();
          //this.getBlogPost();
        })
        .catch(() => {
          console.log("Internal server error");
        });
      this.setState({ redirect: true });
    } else {
      this.setState({ message: "Invalid Form" });
    }
  };

  render() {
    //console.log("State: ", this.state);
    const { formErrors } = this.state;
    if (this.state.redirect) {
      return <Redirect push to="/home" />;
    }
    //JSX
    return (
      <div className="pagelayout">
        <div className="container">
          <h2>Seer User Registration</h2>
          <form onSubmit={this.addUser}>
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
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="text"
                id="dob"
                placeholder="Date of Birth"
                value={this.state.dob}
                onChange={this.handleChange}
              />
              {formErrors.dob.length > 0 && (
                <span className="errorMessage">{formErrors.dob}</span>
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

export default Register;
