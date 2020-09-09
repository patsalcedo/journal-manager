import React from "react";
import axios from "axios";
//import "./search.css";

class Search extends React.Component {
  state = {
    searchTerm: '',
    message: '',
    redirect: false,
    paperdata: [],
  };

  componentDidMount = () => {
//    this.getAcceptedPaperData();
  };

  getAcceptedPaperData = (event) => {
    event.preventDefault();
    axios
      .get("/api/papercontroller/getsearch", {
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
