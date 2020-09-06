import React from "react";
import axios from "axios";
<<<<<<< HEAD
// import "./App.css";

class App extends React.Component {
  state = {
    name: "",
    dob: "",
    email: "",
    userrole: "",
    token:"",
=======
import { Redirect } from "react-router-dom";
import "./register.css";

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
>>>>>>> 0cc3fb347ff230770f1bf1e765856a4f7f6d7502
    userdata: [],
  };

  componentDidMount = () => {
    //this.getBlogPost();
  };

<<<<<<< HEAD
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
=======
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
>>>>>>> 0cc3fb347ff230770f1bf1e765856a4f7f6d7502
  };

  getUserData = () => {
    axios
<<<<<<< HEAD
      .get("/api/usercontroller/getuserdata",{
        body:{
          role:'admin'
        },
        headers:{
          'Authorization': `Bearer ${this.state.token}`
        },
      })
      .then((response) => {
        const data = response.data;
        this.setState({ userdata: data });
        console.log(data);
=======
      .get("/api/usercontroller/getuser")
      .then((response) => {
        const data = response.data;
        this.setState({ userdata: data });
>>>>>>> 0cc3fb347ff230770f1bf1e765856a4f7f6d7502
        console.log("Data has been retrieved");
      })
      .catch(() => {
        alert("Error from Server");
      });
  };

  addUser = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    var sessionToken = localStorage.getItem('Token');
    const payload = {
      name: this.state.title,
      dob: this.state.body,
      email: this.state.email,
      userrole: this.state.userrole,
    };

    //axios.defaults.headers.common['Authorization'] = sessionToken;
    axios({
      url: "/api/usercontroller/newregistereduser",
      method: "POST",
      data: payload,     
    })
      .then(resp => {
        console.log(resp.data);
        //this.resetUserInputs();
        //this.getBlogPost();
      });
  };
  render() {
    //console.log("State: ", this.state);
=======
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
        .then(() => {
          console.log("Data has been sent to the server");
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
    // console.log("State: ", this.state);
    const { formErrors } = this.state;

    if (this.state.redirect) {
      return <Redirect push to="/home" />;
    }
>>>>>>> 0cc3fb347ff230770f1bf1e765856a4f7f6d7502

    //JSX
    return (
      <div className="app">
        <h2>Seer User Registration</h2>
        <form onSubmit={this.addUser}>
          <div className="form-input">
<<<<<<< HEAD
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="userrole"
              placeholder="User Role"
              value={this.state.userrole}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              name="dob"
=======
            <label for="userName">User Name</label>
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
            <label for="firstName">First Name</label>
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
            <label for="lastName">Last Name</label>
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
            <label for="email">Email</label>
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
            <label for="dob">Date of Birth</label>
            <input
              type="text"
              id="dob"
>>>>>>> 0cc3fb347ff230770f1bf1e765856a4f7f6d7502
              placeholder="Date of Birth"
              value={this.state.dob}
              onChange={this.handleChange}
            />
<<<<<<< HEAD
          </div>
          <div className="form-input">
            <input
              type="text"
              name="token"
              placeholder="token"
              value={this.state.token}
              onChange={this.handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
        <button onClick={this.getUserData}>Submit Token</button>
=======
            {formErrors.dob.length > 0 && (
              <span className="errorMessage">{formErrors.dob}</span>
            )}
          </div>
          <div className="form-input">
            <label for="password">Password</label>
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
>>>>>>> 0cc3fb347ff230770f1bf1e765856a4f7f6d7502
      </div>
    );
  }
}

<<<<<<< HEAD
// import logo from './logo.svg';
// import './App.css';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//           Click to view Database
//       </header>
//     </div>
//   );
// }

export default App;
=======
export default Register;
>>>>>>> 0cc3fb347ff230770f1bf1e765856a4f7f6d7502
