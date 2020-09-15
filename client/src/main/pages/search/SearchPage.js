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
            <button>submit</button>
            <span>{this.state.message}</span>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
