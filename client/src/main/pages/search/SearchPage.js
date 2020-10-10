import React from "react";
import axios from "axios";
import "../search/SearchPage.css";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      redirect: false,
      paperdata: [],
      paperdataChecked: [],
      tableHeaders: [
        "SE Type",
        "Claim",
        "Level of Evidence",
        "Type of Evidence",
        "Title",
        "Author",
        "Journal Name",
        "DOI",
      ],
      startDate: "1665",
      endDate: "2020",
      seType: "",
      claims: [],
      seTypeOption: [
        { title: "TDD", value: "TDD" },
        { title: "BDD", value: "BDD" },
      ],
      claimsOptions: [
        { title: "all claims", value: "all claims" },
        { title: "great performance", value: "great performance" },
        { title: "more productive", value: "more productive" },
      ],
      tableRendered: false,
      sortBy: "",
      columnToSelect: [
        { title: "Year", value: "Year" },
        { title: "Volume", value: "Volume" },
      ],
      yearCol: false,
      volCol: false,
      radioYear: "custom",
      startDateOption: Array.from(
        { length: 2020 - 1943 },
        (x, i) => `${2020 - i}`
      ),
      endDateOption: Array.from(
        { length: 2020 - 1943 },
        (x, i) => `${2020 - i}`
      ),
      mouseX: null,
      mouseY: null,
    };
  }

  componentDidMount = () => {
    //    this.getAcceptedPaperData();
    console.log("calling from searchpage.js:", this.props.isLoggedIn);
    // if (this.props.isLoggedIn === "false") {
    //   this.props.history.push("/login");
    //   console.log("navigating to login since isLoggedin is false");
    // }
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  handleYearClose = () => {
    const sortOrder = ["Year", "Volume"];
    const sorter = (a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    };
    var newArray = []
    console.log(this.state.yearCol)
    if(this.state.yearCol) {
      newArray = this.state.tableHeaders
      newArray.splice(8,1)
      this.setState({
        yearCol: false
      })
    } else {
      newArray = this.state.tableHeaders
      newArray.push("Year")
      newArray.sort(sorter)
      this.setState({
        yearCol: true
      })
    }
    var same = true;
    if (newArray.length >= this.state.tableHeaders.length) {
      for (var j in newArray) {
        if (this.state.tableHeaders[j] === newArray[j]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    } else {
      for (var z in this.state.tableHeaders) {
        if (this.state.tableHeaders[z] === newArray[z]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    }
    if (!same) {
      this.setState({
        tableHeaders: null,
      });
      this.setState({
        tableHeaders: newArray,
      });
    }
    this.setState({
      mouseX: null,
      mouseY: null,
    })
    console.log(this.state.tableHeaders)
    this.buildTable(this.state.paperdata)

  };


  handleVolumeClose = () => {
    const sortOrder = ["Year", "Volume"];
    const sorter = (a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    };
    var newArray = []
    console.log(this.state.volCol)
    if(this.state.volCol) {
      newArray = this.state.tableHeaders
      newArray.splice(8,1)
      this.setState({
        volCol: false
      })
    } else {
      newArray = this.state.tableHeaders
      newArray.push("Volume")
      newArray.sort(sorter)
      this.setState({
        volCol: true
      })
    }
    var same = true;
    if (newArray.length >= this.state.tableHeaders.length) {
      for (var j in newArray) {
        if (this.state.tableHeaders[j] === newArray[j]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    } else {
      for (var z in this.state.tableHeaders) {
        if (this.state.tableHeaders[z] === newArray[z]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    }
    if (!same) {
      this.setState({
        tableHeaders: null,
      });
      this.setState({
        tableHeaders: newArray,
      });
    }
    this.setState({
      mouseX: null,
      mouseY: null,
    })
    console.log(this.state.tableHeaders)
    this.buildTable(this.state.paperdata)
  };

  getAcceptedPaperData = (event) => {
    event.preventDefault();
    if (this.state.claims.length > 0) {
      this.setState({
        paperdata: [],
      });
      console.log("not using filter..");
      var claimsData = "";
      if (this.state.claims.includes("all claims")) {
        claimsData = "great performance,more productive ";
      } else {
        for (var i = 0; i < this.state.claims.length; i++) {
          claimsData += this.state.claims[i] + ",";
        }
      }
      if (this.state.radioYear === "custom") {
        axios
          .get("/api/papercontroller/getfilteredsearch", {
            params: {
              seType: this.state.seType,
              claims: claimsData.substring(0, claimsData.length - 1),
              startDate: this.state.startDate,
              endDate: this.state.endDate,
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
      } else {
        var newEndDate = "2020";
        var newStartDate = this.state.radioYear;
        axios
          .get("/api/papercontroller/getfilteredsearch", {
            params: {
              seType: this.state.seType,
              claims: claimsData.substring(0, claimsData.length - 1),
              startDate: newStartDate,
              endDate: newEndDate,
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
      }
    } else {
      alert("Select what claim(s) you're looking for!");
    }
  };
  handleStartDateChange = (input) => {
    // console.log(input);
    if (input !== this.state.startDate) {
      this.setState({
        startDate: input,
      });
    }
  };
  handleEndDateChange = (input) => {
    // console.log(input);
    if (input !== this.state.endDate) {
      this.setState({
        endDate: input,
      });
    }
  };
  handleRadioYear = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    var data = event.target.value;
    this.setState({
      radioYear: data,
    });
  };
  handleSETypeChange = (input) => {
    if (input !== this.state.seType) {
      this.setState({
        seType: input,
      });
    }
  };
  handleClaimsChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    var newClaim = this.state.claims;
    newClaim[this.state.claims.length] = data;
    this.setState({
      claims: newClaim,
    });
  };
  handleChangeForClaimsInput = (input) => {
    var newArray = [];
    var same = true;
    if (input) {
      for (var x in input) {
        newArray.push(input[x].props.label);
      }
    }
    if (newArray.length >= this.state.claims.length) {
      for (var j in newArray) {
        if (this.state.claims[j] === newArray[j]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    } else {
      for (var z in this.state.claims) {
        if (this.state.claims[z] === newArray[z]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    }
    if (!same) {
      this.setState({
        claims: null,
      });
      this.setState({
        claims: newArray,
      });
    }
  };
  handleChangeForColumnSelectInput = (input) => {
    const sortOrder = ["Year", "Volume"];
    const sorter = (a, b) => {
      return sortOrder.indexOf(a) - sortOrder.indexOf(b);
    };
    var newArray = [
      "SE Type",
      "Claim",
      "Level of Evidence",
      "Type of Evidence",
      "Title",
      "Author",
      "Journal Name",
      "DOI",
    ];

    var same = true;
    if (input) {
      for (var x in input) {
        newArray.push(input[x].props.label);
      }
      newArray.sort(sorter);
    }
    if (newArray.length >= this.state.tableHeaders.length) {
      for (var j in newArray) {
        if (this.state.tableHeaders[j] === newArray[j]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    } else {
      for (var z in this.state.tableHeaders) {
        if (this.state.tableHeaders[z] === newArray[z]) {
          same = true;
        } else {
          same = false;
          break;
        }
      }
    }
    if (!same) {
      this.setState({
        tableHeaders: null,
      });
      this.setState({
        tableHeaders: newArray,
      });
    }
  };
  handleSortByChange = (event) => {
    event.preventDefault();
    var data = event.target.value;
    console.log(event.target.value);
    this.setState({
      sortBy: data,
    });
    this.sortTable(data);
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
      colNum = this.state.tableHeaders.indexOf(column);
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
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
  };

  arraysEqual = (_arr1, _arr2) => {
    if (
      !Array.isArray(_arr1) ||
      !Array.isArray(_arr2) ||
      _arr1.length !== _arr2.length
    )
      return false;

    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();

    for (var i in arr1) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  buildTable = (data) => {
    var same = this.arraysEqual(data, this.state.paperdataChecked);
    // console.log("same doi", same);
    var tabledata = document.getElementById("myTable");
    // if (!same && data.length > 0) {
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
          header = header + `<td>${data[i].claims}</td>`;
        }
        if (this.state.tableHeaders.includes("Level of Evidence")) {
          header = header + `<td>${data[i].level_of_evidence}</td>`;
        }
        if (this.state.tableHeaders.includes("Type of Evidence")) {
          header = header + `<td>${data[i].type_of_evidence}</td>`;
        }
        if (this.state.tableHeaders.includes("Title")) {
          header = header + `<td>${data[i].title}</td>`;
        }
        if (this.state.tableHeaders.includes("Author")) {
          header = header + `<td>${data[i].author}</td>`;
        }
        if (this.state.tableHeaders.includes("Journal Name")) {
          header = header + `<td>${data[i].publisher}</td>`;
        }
        if (this.state.tableHeaders.includes("DOI")) {
          header = header + `<td>${data[i].doi}</td>`;
        }
        if (this.state.tableHeaders.includes("Year")) {
          header = header + `<td>${data[i].year}</td>`;
        }
        if (this.state.tableHeaders.includes("Volume")) {
          header = header + `<td>${data[i].volume}</td>`;
        }
        header = header + `</tr>`;
        tabledata.innerHTML += header;
      }
    // } else if (!same && data.length <= 0) {
    //   tabledata.innerHTML = "";
    //   row = `<tr>`;
    //   for (j = 0; j < this.state.tableHeaders.length; j++) {
    //     row = row + `<th>${this.state.tableHeaders[j]}</th>`;
    //   }
    //   row = row + `</tr>`;
    //   tabledata.innerHTML += row;
    //}
    // if (!same) {
    //   this.setState({ paperdataChecked: null });
    //   this.setState({ paperdataChecked: data });
    //   // console.log("afterchangepaperchecked", this.state.paperdataChecked);
    // }
  };

  render() {
    //JSX
    return (
      <div className="pagelayout-for-search">
        <div className="container-filter">
          <h2>Seer Paper Search</h2>
          <form onSubmit={this.getAcceptedPaperData}>
            <div className="date-from">
              <Autocomplete
                id="combo-box-demo"
                options={this.state.startDateOption}
                getOptionLabel={(option) => option}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Date Range From"
                    variant="outlined"
                    onChange={this.handleStartDateChange(
                      params.inputProps.value
                    )}
                  />
                )}
              />
              <Autocomplete
                id="combo-box-demo"
                options={this.state.endDateOption}
                getOptionLabel={(option) => option}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Date Range To"
                    variant="outlined"
                    onChange={this.handleEndDateChange(params.inputProps.value)}
                  />
                )}
              />
            </div>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose Year</FormLabel>
                <RadioGroup
                  aria-label="Year Range"
                  name="radioYear"
                  value={this.state.radioYear}
                  onChange={this.handleRadioYear}
                >
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom"
                  />
                  <FormControlLabel
                    value="2015"
                    control={<Radio />}
                    label="Last 5 year"
                  />
                  <FormControlLabel
                    value="2010"
                    control={<Radio />}
                    label="Last 10 year"
                  />
                  <FormControlLabel
                    value="2020"
                    control={<Radio />}
                    label="This year"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="All years"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="option-selection">
              <Autocomplete
                id="combo-box-demo"
                options={this.state.seTypeOption}
                getOptionLabel={(option) => option.title}
                style={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose SE Type"
                    variant="outlined"
                    onChange={this.handleSETypeChange(params.inputProps.value)}
                  />
                )}
              />
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={this.state.claimsOptions}
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
                    label="Choose claims"
                    placeholder=""
                    onChange={this.handleChangeForClaimsInput(
                      params.InputProps.startAdornment
                    )}
                  />
                )}
              />
            </div>
            {/* <Autocomplete
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
            /> */}
            <button className="submitBtn">Run Search</button>
            <span>{this.state.message}</span>
          </form>
        </div>
        <div className="container-paperdata" onContextMenu={this.handleClick}>
          <h2>Search Results</h2>
          {this.state.paperdata.length > 0 && (
            <div>
              {/* <div>
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
              </div> */}
            </div>
          )}
          <Menu
            keepMounted
            open={this.state.mouseY !== null}
            onClose={this.handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              this.state.mouseY !== null && this.state.mouseX !== null
                ? { top: this.state.mouseY, left: this.state.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={this.handleYearClose}>Year</MenuItem>
            <MenuItem onClick={this.handleVolumeClose}>Volume</MenuItem>
          </Menu>
          {this.state.paperdata.length > 0}
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
