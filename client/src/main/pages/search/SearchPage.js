import React from "react";
import axios from "axios";
//import "./search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      fromDate: '',
      toDate: '',
      message: '',
      nameOfField: '',
      redirect: false,
      paperdata: [],
      dateFrom: "last 5 years",
      dateTo: "today",
      nameOfField: "",
      operator: "",
      filterValue: "",
      usedFilter: false,
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
      .get("/api/papercontroller/getSearch", {
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

  handleDateFromChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      dateFrom: data,
    });
  };
  handleDateToChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      dateTo: data,
    });
  };
  handleNameFieldChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      nameOfField: data,
    });
  };
  handleOperatorChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      operator: data,
    });
  };
  handleFilterValueChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      filterValue: data,
    });
  };
  handleUseFilterChange = (event) => {
    var data = event.target.checked;
    console.log(event.target.value);
    this.setState({
      usedFilter: data,
    });
  };
  render() {
    //JSX
    return (
      <div>
        <div className="app">
          <h2>Seer Paper Search</h2>
          <h3>Login Status: {this.props.isLoggedIn}</h3>
          <form onSubmit={this.getAcceptedPaperData}>
            <div className="form-input">
              <label>Enter Description</label>
              <input
                type="text"
                id="userName"
                placeholder="Enter Search Term"
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="userFilter">
              <label>Using Filter</label>
              <input
                type="checkbox"
                id="useFilterCheckBox"
                onChange={this.handleUseFilterChange}
              />
            </div>
            <div className="date-from">
              <label>Date Range</label>
              <label>From</label>
              <select
                name="date-from-option"
                id="date-from-option"
                onChange={this.handleDateFromChange}
              >
                <option value="last 5 years">Last 5 years</option>
                <option value="last 10 years">Last 10 years</option>
                <option value="last 15 years">Last 15 years</option>
                <option value="more than 15 years">More than 15 years</option>
              </select>
            </div>
            <div className="date-to">
              <label>To</label>
              <select
                name="date-to-option"
                id="date-to-option"
                onChange={this.handleDateToChange}
              >
                <option value="today">Today</option>
                <option value="last 5 years">Last 5 years</option>
                <option value="last 10 years">Last 10 years</option>
                <option value="last 15 years">Last 15 years</option>
              </select>
            </div>
            <div className="option-selection">
              <label>If</label>
              <select
                name="nameOfField"
                id="nameOfField"
                onChange={this.handleNameFieldChange}
              >
                <option value="method">Method</option>
                <option value="author">Author</option>
              </select>
              <select
                name="operator"
                id="operator"
                onChange={this.handleOperatorChange}
              >
                <option value="equal">EQUALS</option>
                <option value="not equal">NOT EQUALS</option>
                <option value="and">AND</option>
                <option value="or">OR</option>
              </select>
              <select
                name="filterValue"
                id="filterValue"
                onChange={this.handleFilterValueChange}
              >
                <option value="tdd">TDD</option>
                <option value="not tdd">Not TDD</option>
              </select>
            </div>
            <button>submit</button>
            <span>{this.state.message}</span>
          </form>
        </div>
    <div>
        {this.state.paperdata.map((paperdetail, index) => {
          return <div>
            <b>{paperdetail.title}</b><br/>
            {paperdetail.author}<br/>
            {paperdetail.key}<br/>
            {paperdetail.publisher}
            <br/><br/>
          </div>
        })}
    </div>
      </div>
    );
  }
}

export default Search;
