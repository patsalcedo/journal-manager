import React from "react";
import axios from "axios";
import "../search/SearchPage.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      fromDate: "",
      toDate: "",
      message: "",
      redirect: false,
      paperdata: [],
      dateFrom: "1665",
      dateTo: "2020",
      nameOfField: "Method",
      operator: "=",
      filterValue: "TDD",
      dateFilter: false,
      operatorFilter: false,
      secondBlock: false,
      thirdBlock: false,
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
    if (this.state.dateFilter && this.state.operatorFilter) {
      console.log("using both filters..");
      axios
        .get("/api/papercontroller/getSearch", {
          params: {
            search: this.state.searchTerm,
            dateFilter: this.state.dateFilter,
            startDate: this.state.dateFrom,
            endDate: this.state.dateTo,
            operatorFilter: this.state.operatorFilter,
            filterValue: this.state.filterValue,
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
    } else if (this.state.dateFilter) {
      console.log("using date filter..");
      axios
        .get("/api/papercontroller/getSearch", {
          params: {
            search: this.state.searchTerm,
            dateFilter: this.state.dateFilter,
            startDate: this.state.dateFrom,
            endDate: this.state.dateTo,
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
    } else if (this.state.operatorFilter) {
      console.log("using operator filter..");
      axios
        .get("/api/papercontroller/getSearch", {
          params: {
            search: this.state.searchTerm,
            operatorFilter: this.state.operatorFilter,
            filterValue: this.state.filterValue,
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
    } else {
      console.log("not using filter..");
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
    }
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
    this.setState({
      filterValue: data,
    });
  };
  handleDateFilterChange = (event) => {
    var data = event.target.checked;
    console.log("date ticked value: ", data);
    this.setState({
      dateFilter: data,
    });
  };
  handleOperatorFilterChange = (event) => {
    var data = event.target.checked;
    console.log("operator ticked value: ", data);
    this.setState({
      operatorFilter: data,
    });
  };
  // handlePlusForSecondBlock = () => {
  //   this.setState({
  //     secondBlock: true,
  //   });
  // };
  // handleMinusForSecondBlock = () => {
  //   this.setState({
  //     secondBlock: false,
  //     thirdBlock: false,
  //   });
  // };
  // handlePlusForThirdBlock = () => {
  //   this.setState({
  //     thirdBlock: true,
  //   });
  // };
  // handleMinusForThirdBlock = () => {
  //   this.setState({
  //     thirdBlock: false,
  //   });
  // };
  render() {
    //JSX
    return (
      <div className="pagelayout-for-search">
        <div className="container-filter">
          <h2>Seer Paper Search</h2>
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
            <div className="dateFilter">
              <label>Using Date Filter</label>
              <input
                type="checkbox"
                id="dateFilterCheckBox"
                onChange={this.handleDateFilterChange}
              />
            </div>
            <div className="operatorFilter">
              <label>Using Operator Filter</label>
              <input
                type="checkbox"
                id="operatorFilterCheckBox"
                onChange={this.handleOperatorFilterChange}
              />
            </div>
            {this.state.dateFilter && (
              <>
                <div className="date-from">
                  <label>Date Range</label>
                  <br />
                  <label>From</label>
                  <select
                    name="date-from-option"
                    id="date-from-option"
                    onChange={this.handleDateFromChange}
                  >
                    <option value="1665">More than 15 years</option>
                    <option value="2010">Last 10 Years</option>
                    <option value="2015">Last 5 Years</option>
                    <option value="2020">This Year</option>
                  </select>
                </div>
                <div className="date-to">
                  <label>To</label>
                  <select
                    name="date-to-option"
                    id="date-to-option"
                    onChange={this.handleDateToChange}
                  >
                    <option value="2020">This Year</option>
                    <option value="2015">Last 5 Years</option>
                    <option value="2010">Last 10 Years</option>
                  </select>
                </div>
              </>
            )}
            {this.state.operatorFilter && (
              <>
                <div className="option-selection">
                  <label>If</label>
                  <select
                    name="nameOfField"
                    id="nameOfField"
                    onChange={this.handleNameFieldChange}
                  >
                    <option value="method">Method</option>
                    {/* <option value="author">Author</option> */}
                  </select>
                  <select
                    name="operator"
                    id="operator"
                    onChange={this.handleOperatorChange}
                  >
                    <option value="equal">EQUALS</option>
                    {/* <option value="not equal">NOT EQUALS</option>
                <option value="and">AND</option>
                <option value="or">OR</option> */}
                  </select>
                  <select
                    name="filterValue"
                    id="filterValue"
                    onChange={this.handleFilterValueChange}
                  >
                    <option value="tdd">TDD</option>
                    {/* <option value="not tdd">Not TDD</option> */}
                  </select>
                  {/* <button onClick={this.handlePlusForSecondBlock}>+</button>
                  <button onClick={this.handleMinusForSecondBlock}>-</button> */}
                </div>
              </>
            )}
            {/* {this.state.secondBlock && (
              <>
                <div className="option-selection">
                  <label>If</label>
                  <select
                    name="nameOfField"
                    id="nameOfField"
                    onChange={this.handleNameFieldChange}
                  >
                    <option value="method">Method</option>
                    <option value="Author">Author</option>
                  </select>
                  <select
                    name="operator"
                    id="operator"
                    onChange={this.handleOperatorChange}
                  >
                    <option value="equal">=</option>
                    <option value="not equal">!=</option>
                  </select>
                  <select
                    name="filterValue"
                    id="filterValue"
                    onChange={this.handleFilterValueChange}
                  >
                    <option value="tdd">TDD</option>
                    <option value="not tdd">No TDD</option>
                  </select>
                  <button onClick={this.handlePlusForThirdBlock}>+</button>
                  <button onClick={this.handleMinusForThirdBlock}>-</button>
                </div>
              </>
            )}
            {this.state.thirdBlock && (
              <>
                <div className="option-selection">
                  <label>If</label>
                  <select
                    name="nameOfField"
                    id="nameOfField"
                    onChange={this.handleNameFieldChange}
                  >
                    <option value="method">Method</option>
                    <option value="Author">Author</option>
                  </select>
                  <select
                    name="operator"
                    id="operator"
                    onChange={this.handleOperatorChange}
                  >
                    <option value="equal">=</option>
                    <option value="not equal">!=</option>
                  </select>
                  <select
                    name="filterValue"
                    id="filterValue"
                    onChange={this.handleFilterValueChange}
                  >
                    <option value="tdd">TDD</option>
                    <option value="not tdd">No TDD</option>
                  </select>
                  <button onClick={this.clickedPlusButtonForSecondBlock}>
                    +
                  </button>
                  <button onClick={this.clickedMinusButtonForSecondBlock}>
                    -
                  </button>
                </div>
              </>
            )} */}
            <button>submit</button>
            <span>{this.state.message}</span>
          </form>
          {/* <h2>Filtering</h2>
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
          </form> */}
        </div>
        <div className="container-paperdata">
          {this.state.paperdata.length > 0 && <h2>Search Results</h2>}
          {this.state.paperdata.map((paperdetail, index) => {
            return (
              <div>
                <b>{paperdetail.title}</b>
                <br />
                {paperdetail.author}
                <br />
                {paperdetail.year}
                <br />
                {paperdetail.publisher}
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Search;
