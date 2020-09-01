import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component{
  state={
    name:'',
    dob:'',
    email:'',
    userrole:'',
    userdata:[]
  };

  componentDidMount = () => {
    //this.getBlogPost();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getUserData =() =>{
    axios.get('/api/usercontroller/getuser')
    .then((response)=>{
      const data = response.data;
      this.setState({userdata:data});
      console.log('Data has been retrieved')
    })
    .catch(()=>{
      alert('Error from Server');
    });
  };

  addUser = (event) => {
    event.preventDefault();

    const payload = {
      name: this.state.title,
      dob: this.state.body,
      email:this.state.email,
      userrole :this.state.userrole,
    };


    axios({
      url: '/api/usercontroller/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        //this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };
  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <h2>Seer User Registration</h2>
        <form onSubmit={this.addUser}>
          <div className="form-input">
            <input type="text" name="name" placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input type="text" name="email" placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input type="text" name="userrole" placeholder="User Role"
              value={this.state.userrole}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <input type="text" name="dob" placeholder="Date of Birth"
              value={this.state.dob}
              onChange={this.handleChange}
            />
          </div>
          

          <button>Submit</button>
        </form>
       
      </div>
    );
  }
}



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
