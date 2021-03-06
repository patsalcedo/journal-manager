const mongoose = require("mongoose");

// Schema
//Bob
const Schema = mongoose.Schema;

const AcceptedPaperSchema = new Schema({
  type_of_evidence: {
    type: String,
  },
  key: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  method : {
    type: String,
  },
  claims: {
    type: Array,
  },
  doi: {
    type: String,
  },
  level_of_evidence: {
    type: String,
  },
  publisher: {
    type: String,
  },
  journal: {
    type: String,
  },
  year: {
    type: String,
  },
  month: {
    type: String,
  },
  volume: {
    type: String,
  },
  number: {
    type: String,
  },
  pages: {
    type: String,
  },
  eprint: {
    type: String,
  },
  eprinttype: {
    type: String,
  },
  eprintclass: {
    type: String,
  },
  annote: {
    type: String,
  },
});

// Model
const AcceptedPaperInfo = mongoose.model(
  "Accepted Papers",
  AcceptedPaperSchema
);

module.exports = AcceptedPaperInfo;
