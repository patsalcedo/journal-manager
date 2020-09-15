import React from "react";
import axios from "axios";
//import "./search.css";

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: '',
      fromDate: '',
      toDate: '',
      message: '',
      nameOfField: '',
      redirect: false,
      paperdata: [],
    };
  } 

  componentDidMount = () => {
//    this.getAcceptedPaperData();
    console.log("calling from searchpage.js:", this.props.isLoggedIn);
    if(this.props.isLoggedIn==="false"){
      this.props.history.push("/login");
      console.log("navigating to login since isLoggedin is false");
    }
  };

  getAcceptedPaperData = (event) => {
    event.preventDefault();
    axios.get("/api/papercontroller/getSearch", {
        params: {
          search: this.state.searchTerm
        }
      })
      .then((response) => {
        const data = response.data;
        this.setState({ paperdata: data });
        console.log("Data has been retrieved");
        console.log(this.state.paperdata)
      })
      .catch(() => {
        alert("Error from Server");
      });
  };

  
  sendAcceptedPaperData = (event) => {
    event.preventDefault();
    var payload = {
      document_type: "Article",
      key: "123",
      title: "Something Not Right",
      author: "Naveen",
      publisher: "1010101010101",
      link: "xxx"
  }
    axios({
      url: "/api/papercontroller/addArticle" ,
      method: "POST",
      data: payload
    })
      .then((response) => {
        console.log("Paper has been added successfully");
      })
      .catch(() => {
        alert("Error from Server");
      });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value)
    this.setState({
        searchTerm: data
    })
}
  render() {

    //JSX
    return (
      <div className="app">
        <h2>Seer Paper Search</h2>
    <h3>Login Status: {this.props.isLoggedIn}</h3>
        <form onSubmit={this.getAcceptedPaperData}>
          <div className="form-input">
            <input
              type="text"
              id="userName"
              placeholder="Enter Search Term"
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
            />
          </div>
          <button>submit</button>
          <span>{this.state.message}</span>
        </form>
      </div>
    );
  }
}

export default Search;
