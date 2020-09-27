import React from "react";
import axios from "axios";
import "../search/SearchPage.css";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      redirect: false,
      paperdata: [],
      tableHeaders: [],
      startDate: "1665",
      endDate: "2020",
      seType: "TDD",
      annote:[],
      annoteOptions:[{ title: "great performance", value: "great performance" },
              { title: "more productive", value: "more productive" },],
      // annote: ["great performance", "more productive"],
      tableRendered: false,
      sortBy:"",
      columnToSelect: [
        { title: "Title", value: "Title" },
        { title: "Author", value: "Author" },
        { title: "Year", value: "Year" },
        { title: "SE Type", value: "SE Type" },
        { title: "DOI", value: "DOI" },
        { title: "Claim", value: "Claim" },
      ],
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
    console.log("not using filter..");
    var annoteData = "";
    for(var i=0;i<this.state.annote.length;i++) {
      annoteData+=this.state.annote[i]+",";
    }
    console.log(annoteData.substring(0, annoteData.length-1))
    axios
      .get("/api/papercontroller/getfilteredsearch", {
        params: {
          seType: this.state.seType,
          annote: annoteData.substring(0, annoteData.length-1),
          startDate:this.state.dateFrom,
          endDate: this.state.dateTo,
        },
      })
      .then((response) => {
        const data = response.data;
        this.setState({ paperdata: data, tableRendered: false });
        console.log("Data has been retrieved");
        console.log(this.state.paperdata);
      })
      .catch(() => {
        alert("Error from Server");
      });
  };

  handleStartDateChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      startDate: data,
    });
  };
  handleEndDateChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      endDate: data,
    });
  };
  handleSETypeChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      seType: data,
    });
  };
  handleAnnoteChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    var newAnnote = this.state.annote;
    newAnnote[this.state.annote.length] = data
    this.setState({
      annote: newAnnote,
    });
  };
  handleChangeForAnnoteInput = (input) => {
    console.log(input);
    var newArray = [];
    if (input) {
      for (var x in input) {
        newArray.push(input[x].props.label);
      }
    }
    console.log(newArray)
    this.state.annote = newArray;
    console.log(this.state.annote)
  };
  handleChangeForColumnSelectInput = (input) => {
    console.log(input);
    var newArray = [];
    if (input) {
      for (var x in input) {
        newArray.push(input[x].props.label);
      }
    }
    const sortOrder = ["SE Type", "Claim", "DOI", "Title", "Author", "Year"];
    const sorter = (a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    };
    newArray.sort(sorter);
    this.state.tableHeaders = newArray;
    console.log(newArray);
    console.log(this.state.tableHeaders);
  };
  handleSortByChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      sortBy: data,
    });
    this.sortTable(data)
  };

  sortTable = (column) => {
    var table, rows, colNum, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      colNum = this.state.tableHeaders.indexOf(column)
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[colNum];
        y = rows[i + 1].getElementsByTagName("td")[colNum];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  buildTable = (data) => {
    if (this.state.tableRendered === false) {
      var tabledata = document.getElementById("myTable");
      console.log("I CALLED");
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          tabledata.innerHTML = "";
          var row = `<tr>`;
          for (var j = 0; j < this.state.tableHeaders.length; j++) {
            row = row + `<th>${this.state.tableHeaders[j]}</th>`;
          }
          row = row + `</tr>`;
          tabledata.innerHTML += row;
        }
        var header = `<tr>`;
        if (this.state.tableHeaders.includes("SE Type")) {
          header = header + `<td>${data[i].method}</td>`;
        }
        if (this.state.tableHeaders.includes("Claim")) {
          header = header + `<td>${data[i].annote}</td>`;
        }
        if (this.state.tableHeaders.includes("DOI")) {
          header = header + `<td>${data[i].month}</td>`;
        }
        if (this.state.tableHeaders.includes("Title")) {
          header = header + `<td>${data[i].title}</td>`;
        }
        if (this.state.tableHeaders.includes("Author")) {
          header = header + `<td>${data[i].author}</td>`;
        }
        if (this.state.tableHeaders.includes("Year")) {
          header = header + `<td>${data[i].year}</td>`;
        }
        header = header + `</tr>`;
        tabledata.innerHTML += header;
      }
    }
    this.state.tableRendered = true;
  };

  render() {
    //JSX
    return (
      <div className="pagelayout-for-search">
        <div className="container-filter">
          <h2>Seer Paper Search</h2>
          <form onSubmit={this.getAcceptedPaperData}>
            <div className="date-from">
              <p>Date Range</p>
              <br />
              <label>From</label>
              <select
                name="date-from-option"
                id="date-from-option"
                onChange={this.handleStartDateChange}
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
                onChange={this.handleEndDateChange}
              >
                <option value="2020">2020</option>
                <option value="2015">2015</option>
                <option value="2010">2010</option>
              </select>
            </div>
            <div>
              <input type="radio" id="lastFive" name="dateRadio" value="2015" />
              <label for="lastFive">Last 5 Years</label>
              <br />
              <input type="radio" id="lastTen" name="dateRadio" value="2010" />
              <label for="lastTen">Last 10 Years</label>
              <br />
              <input type="radio" id="thisYear" name="dateRadio" value="2020" />
              <label for="thisYear">This Year</label>
              <br />
              <input type="radio" id="allYear" name="dateRadio" value="0" />
              <label for="allYear">All Years</label>
              <br />
            </div>
            <div className="option-selection">
              <label>If</label>
              <select
                name="seType"
                id="seType"
                onChange={this.handleSETypeChange}
              >
                <option value="TDD">TDD</option>
                <option value="BDD">BDD</option>
              </select>
              <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={this.state.annoteOptions}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    // icon={icon}
                    // checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </React.Fragment>
              )}
              style={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Choose columns"
                  placeholder=""
                  onChange={this.handleChangeForAnnoteInput(
                    params.InputProps.startAdornment
                  )}
                />
              )}
            />
              {/* <select
                name="annote"
                id="annote"
                onChange={this.handleAnnoteChange}
              >
                <option value="great performance">Great Performance</option>
                <option value="more productive">More Productive</option>
              </select> */}
            </div>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={this.state.columnToSelect}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    // icon={icon}
                    // checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </React.Fragment>
              )}
              style={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Choose columns"
                  placeholder=""
                  onChange={this.handleChangeForColumnSelectInput(
                    params.InputProps.startAdornment
                  )}
                />
              )}
            />
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
                  onChange={this.handleSortByChange}
                >
                  <option value="SE Practice">SE Practice</option>
                  <option value="Claim">Evidence</option>
                  <option value="Title">Title</option>
                </select>
              </div>
            </div>
          )}

          {this.state.paperdata.length > 0 && <h2>Search Results</h2>}
          <table id="myTable">
            <tr></tr>
            <tbody></tbody>
          </table>
          {this.buildTable(this.state.paperdata)}
        </div>
      </div>
    );
  }
}

export default Search;
