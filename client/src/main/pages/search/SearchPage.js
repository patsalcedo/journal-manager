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
      tableHeaders: ["Title", "Author", "Year"],
      dateFrom: "1665",
      dateTo: "2020",
      nameOfField: "Method",
      operator: "=",
      filterValue: "TDD",
      dateFilter: true,
      operatorFilter: true,
      columnSelectDrop: false,
      tableRendered: false
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
    // } else if (this.state.dateFilter) {
    //   console.log("using date filter..");
    //   axios
    //     .get("/api/papercontroller/getSearch", {
    //       params: {
    //         search: this.state.searchTerm,
    //         dateFilter: this.state.dateFilter,
    //         startDate: this.state.dateFrom,
    //         endDate: this.state.dateTo,
    //       },
    //     })
    //     .then((response) => {
    //       const data = response.data;
    //       this.setState({ paperdata: data });
    //       console.log("Data has been retrieved");
    //       console.log(this.state.paperdata);
    //     })
    //     .catch(() => {
    //       alert("Error from Server");
    //     });
    // } else if (this.state.operatorFilter) {
    //   console.log("using operator filter..");
    //   axios
    //     .get("/api/papercontroller/getSearch", {
    //       params: {
    //         search: this.state.searchTerm,
    //         operatorFilter: this.state.operatorFilter,
    //         filterValue: this.state.filterValue,
    //       },
    //     })
    //     .then((response) => {
    //       const data = response.data;
    //       this.setState({ paperdata: data,
    //       tableRendered: false });
    //       console.log("Data has been retrieved");
    //       console.log(this.state.paperdata);
    //     })
    //     .catch(() => {
    //       alert("Error from Server");
    //     });
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
          this.setState({ paperdata: data,
            tableRendered: false });
          console.log("Data has been retrieved");
          console.log(this.state.paperdata[0])
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
  handleColumnSelectDrop = () => {
    this.state.columnSelectDrop &&
      this.setState({
        columnSelectDrop: false,
      });
    !this.state.columnSelectDrop &&
      this.setState({
        columnSelectDrop: true,
      });
  };

  render() {
    //JSX
    return (
      <div className="pagelayout-for-search">
        <div className="container-filter">
          <h2>Seer Paper Search</h2>
          <form onSubmit={this.getAcceptedPaperData}>
            {this.state.dateFilter && (
              <>
                <div className="date-from">
                  <p>Date Range</p>
                  <br />
                  <label>From</label>
                  <select
                    name="date-from-option"
                    id="date-from-option"
                    onChange={this.handleDateFromChange}
                  >
                    <option value="1665">1665</option>
                    <option value="2010">2010</option>
                    <option value="2015">2015</option>
                    <option value="2020">2020</option>
                  </select>
                  <label> To </label>
                  <select
                    name="date-to-option"
                    id="date-to-option"
                    onChange={this.handleDateToChange}
                  >
                    <option value="2020">2020</option>
                    <option value="2015">2015</option>
                    <option value="2010">2010</option>
                  </select>
                </div>
                <div>
                  <input
                    type="radio"
                    id="lastFive"
                    name="dateRadio"
                    value="2015"
                  />
                  <label for="lastFive">Last 5 Years</label>
                  <br />
                  <input
                    type="radio"
                    id="lastTen"
                    name="dateRadio"
                    value="2010"
                  />
                  <label for="lastTen">Last 10 Years</label>
                  <br />
                  <input
                    type="radio"
                    id="thisYear"
                    name="dateRadio"
                    value="2020"
                  />
                  <label for="thisYear">This Year</label>
                  <br />
                  <input type="radio" id="allYear" name="dateRadio" value="0" />
                  <label for="allYear">All Years</label>
                  <br />
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
                </div>
              </>
            )}
            <div className="columnCheckBox">
              <button onClick={this.handleColumnSelectDrop}>
                Select Column to Display
              </button>
              {this.state.columnSelectDrop && (
                <div>
                  <input
                    type="checkbox"
                    id="titleColumnCheckBox"
                    // onChange={this.handleDateFilterChange}
                  />
                  <label>Title</label> <br />
                  <input
                    type="checkbox"
                    id="yearColumnCheckBox"
                    // onChange={this.handleDateFilterChange}
                  />
                  <label>Year</label>
                  <br />
                  <input
                    type="checkbox"
                    id="authorColumnCheckBox"
                    // onChange={this.handleDateFilterChange}
                  />
                  <label>Author</label> <br />
                  <input
                    type="checkbox"
                    id="documentTypeColumnCheckBox"
                    // onChange={this.handleDateFilterChange}
                  />
                  <label>Document Type</label> <br />
                  <input
                    type="checkbox"
                    id="doiColumnCheckBox"
                    // onChange={this.handleDateFilterChange}
                  />
                  <label>DOI</label> <br />
                  <input
                    type="checkbox"
                    id="pageNumberColumnCheckBox"
                    // onChange={this.handleDateFilterChange}
                  />
                  <label>Page Number</label> <br />
                </div>
              )}
            </div>
            <button className="submitBtn">Run Search</button>
            <span>{this.state.message}</span>
          </form>
        </div>
        <div className="container-paperdata">
          {this.state.paperdata.length > 0 && (
            <div>
              <h2>Search Results</h2>
              <div>
                <label> Sort By: </label>
                <select
                  name="sortByOption"
                  id="sortByOption"
                  onChange={this.handleDateToChange}
                >
                  <option value="sortBySePractice">SE Practice</option>
                  <option value="sortByEvidence">Evidence</option>
                  <option value="sortTitle">Title</option>
                </select>
              </div>
            </div>
          )}
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
        <div className="container-paperdata">       
          {this.state.paperdata.length > 0 && <h2>Search Results</h2>}
          <table id = "myTable">
            <tr>
              
            </tr>
            <tbody>

            </tbody>
          </table>
          {this.buildTable(this.state.paperdata)}
        </div>
      </div>
    );
  }
}

export default Search;
