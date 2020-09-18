import React from "react";
import axios from "axios";
import "../../../main/main.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      message: "",
      redirect: false,
      paperdata: [],
    };
  }

  componentDidMount = () => {
    //    this.getAcceptedPaperData();
    console.log("calling from searchpage.js:", this.props.isLoggedIn);
    if (this.props.isLoggedIn === "false") {
      this.props.history.push("/login");
      console.log("navigating to login since isLoggedin is false");
    }
  };

  // onFilterToggle = (event) => {
  //   event.preventDefault();
  //   axios
  //   .get("/api/filtercontroller/getfilteredsearch", {
  //     params
  //   })
  // }

  getAcceptedPaperData = (event) => {
    event.preventDefault();
    axios
      .get("/api/papercontroller/getsearch", {
        params: {
          search: this.state.searchTerm,
        },
      })
      .then((response) => {
        const data = response.data;
        this.setState({ paperdata: data });
        console.log("Data has been retrieved");
        console.log(this.state.paperdata);
      })
      .catch(() => {
        alert("Error from Server");
      });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      searchTerm: data,
    });
  };
  render() {
    //JSX
    return (
      <div className="pagelayout">
        <div className="container">
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
            <button className="submitBtn">Search</button>
            <span>{this.state.message}</span>
          </form>
          <h2>Filtering</h2>
          <form onSubmit={this.onFilterToggle}>
            <input
              type="checkbox"
              id="content1"
              name="filterOptions"
              value="article"
            />
            <label for="content1">Article</label>
            <br />
            <input
              type="checkbox"
              id="content2"
              name="filterOptions"
              value="proceeding"
            />
            <label for="content2">Proceeding</label>
            <br />
            <input
              type="checkbox"
              id="content3"
              name="filterOptions"
              value="book"
            />
            <label for="content3">Book</label>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
