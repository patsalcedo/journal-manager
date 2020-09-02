import React, { Component } from "react";
import "./App.css";
import Main from "./main/main.js";

// class App extends React.Component{
//   state={
//     name:'',
//     dob:'',
//     email:'',
//     userrole:'',
//     userdata:[]
//   };

//   componentDidMount = () => {
//     //this.getBlogPost();
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };

//   getUserData =() =>{
//     axios.get('/api/usercontroller/getuser')
//     .then((response)=>{
//       const data = response.data;
//       this.setState({userdata:data});
//       console.log('Data has been retrieved')
//     })
//     .catch(()=>{
//       alert('Error from Server');
//     });
//   };

//   addUser = (event) => {
//     event.preventDefault();

//     const payload = {
//       name: this.state.name,
//       dob: this.state.dob,
//       email:this.state.email,
//       userrole :this.state.userrole,
//     };


//     axios({
//       url: '/api/usercontroller/newregistereduser',
//       method: 'POST',
//       data: payload
//     })
//       .then(() => {
//         console.log('Data has been sent to the server');
//         this.resetUserInputs();
//         //this.getBlogPost();
//       })
//       .catch(() => {
//         console.log('Internal server error');
//       });;
//   };

class App extends Component {
  render() {
    return (
      <div className="maindiv">
        <Main />
      </div>
    );
  }
}

export default App;
