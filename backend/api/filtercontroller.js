const express = require("express");
const router = express.Router;

const PaperData = require("../database/acceptedpaper");
const { json } = require("express");

router.get("/filtercontroller/getfilteredsearch", (req, res) => {
  const filters = req.body.filterOptions;
  console.log("Filters check: " + filters);

  PaperData.find({ document_type: { $elemMatch: { $in: filters } } })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((err) => {
      console.log("error: ", error);
    });
});
