import React from "react";
import axios from "axios";
import "../../../main/main.css";
// import { Redirect } from "react-router-dom";
// import "./add-document.css";

//Error handling for users submit register without putting anything
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Add extends React.Component {
  state = {
    response_message:"",
    formErrors: {
      document_type: "",
      key: "",
      title: "",
    },
    author: "",
    method: "",
    publisher: "",
    journal: "",
    year: "",
    month: "",
    volume: "",
    number: "",
    pages: "",
    eprint: "",
    eprinttype: "",
    eprintclass: "",
    annote: "",
    message: "",
  };

  componentDidMount = () => {
    console.log("calling from add-document.js:", this.props.isLoggedIn);
    if (this.props.isLoggedIn === "false") {
      this.props.history.push("/login");
      console.log("navigating to login since isLoggedin is false");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (id) {
      case "document_type":
        formErrors.document_type =
          value.length < 4 ? "Type of document need to be filled" : {};
        break;
      case "key":
        formErrors.key = value.length < 4 ? "Key need to be filled" : {};
        break;
      case "title":
        formErrors.title = value.length < 4 ? "Title need to be filled" : {};
        break;
      default:
        break;
    }
    this.setState({ formErrors, [id]: value });
  };

  addDocument = (event) => {
    console.log("IM BEING CALLED");
    event.preventDefault();
    this.setState({ message: "" });
    if (formValid(this.state)) {
      const payload = {
        document_type: this.state.document_type,
        key: this.state.key,
        title: this.state.title,
        author: this.state.author,
        method: this.state.method,
        publisher: this.state.publisher,
        journal: this.state.journal,
        year: this.state.year,
        month: this.state.month,
        volume: this.state.volume,
        number: this.state.number,
        pages: this.state.pages,
        eprint: this.state.eprint,
        eprinttype: this.state.eprinttype,
        eprintclass: this.state.eprintclass,
        annote: this.state.annote,
      };
      //   console.log(payload);
      console.log("Payload: ", payload);
      axios({
        url: "/api/papercontroller/addarticle",
        method: "POST",
        data: payload,
      })
        .then((resp) => {
          console.log(resp.data);
          this.setState({response_message:resp.data.message});
          //this.getBlogPost();
        })
        .catch((err) => {
          console.log(err);
        });
      //   this.setState({ redirect: true });
    } else {
      this.setState({ message: "Essential information need to be filled" });
    }
  };

  render() {
    //console.log("State: ", this.state);
    const { formErrors } = this.state;
    //JSX
    return (
      <div className="pagelayout">
        <div className="container">
          <h2>Add Document Page</h2>
          <form onSubmit={this.addDocument}>
            <div className="form-input">
              <label htmlFor="document_type">Document Type</label>
              <input
                type="text"
                id="document_type"
                placeholder="Document Type"
                value={this.state.document_type}
                onChange={this.handleChange}
              />
              {formErrors.document_type.length > 0 && (
                <span className="errorMessage">{formErrors.document_type}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="key">Key</label>
              <input
                type="text"
                id="key"
                placeholder="Key"
                value={this.state.key}
                onChange={this.handleChange}
              />
              {formErrors.key.length > 0 && (
                <span className="errorMessage">{formErrors.key}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleChange}
              />
              {formErrors.title.length > 0 && (
                <span className="errorMessage">{formErrors.title}</span>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                placeholder="Author"
                value={this.state.author}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="method">Method</label>
              <input
                type="text"
                id="method"
                placeholder="Method"
                value={this.state.method}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                id="publisher"
                placeholder="Publisher"
                value={this.state.publisher}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="journal">Journal</label>
              <input
                type="text"
                id="journal"
                placeholder="Journal"
                value={this.state.journal}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                placeholder="Year"
                value={this.state.year}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="month">Month</label>
              <input
                type="text"
                id="month"
                placeholder="Month"
                value={this.state.month}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="volume">Volume</label>
              <input
                type="text"
                id="volume"
                placeholder="Volume"
                value={this.state.volume}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="pages">Pages</label>
              <input
                type="text"
                id="pages"
                placeholder="Pages"
                value={this.state.pages}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                id="number"
                placeholder="Number"
                value={this.state.number}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="eprint">Eprint</label>
              <input
                type="text"
                id="eprint"
                placeholder="Eprint"
                value={this.state.eprint}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="eprinttype">Eprint Type</label>
              <input
                type="text"
                id="eprinttype"
                placeholder="Eprint Type"
                value={this.state.eprinttype}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="eprintclass">Eprint Class</label>
              <input
                type="text"
                id="eprintclass"
                placeholder="Eprint Class"
                value={this.state.eprintclass}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="annote">Annote</label>
              <input
                type="text"
                id="annote"
                placeholder="Annote"
                value={this.state.annote}
                onChange={this.handleChange}
              />
            </div>
            <button className="submitBtn">Add Document</button>
            <span>{this.state.message}</span>
          </form>
              <h3>{this.state.response_message}</h3>
        </div>
      </div>
    );
  }
}

export default Add;
