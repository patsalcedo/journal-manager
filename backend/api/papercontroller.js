const express = require("express");

const router = express.Router();

const AcceptedPaperData = require("../database/acceptedpaper");

// Routes
router.get("/papercontroller/getsearch", (req, res) => {
  //http://localhost:8080/api/acceptedpapercontroller/getsearch?searchterm
  const search = req.query.search;
  const isDateFilterTicked = req.query.dateFilter;
  const isOperatorFilterTicked = req.query.operatorFilter;

  console.log("Search Term :" + search+ " is date ticked: "+ isDateFilterTicked+" is operator ticked: "+ isOperatorFilterTicked);
  if(isOperatorFilterTicked && isDateFilterTicked){
    const filterValue = req.query.filterValue;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    console.log("filter is ticked: method to filter is :", filterValue);
    console.log("filter is ticked: start date and end date:", startDate, endDate);
    AcceptedPaperData.find({ title: { $regex: search, $options: "i" }, method: "TDD", year :{$gte: startDate , $lte: endDate}  })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  }
  else if(isOperatorFilterTicked){
    const filterValue = req.query.filterValue;
    console.log("filter is ticked: method to filter is :", filterValue);
    AcceptedPaperData.find({ title: { $regex: search, $options: "i" }, method: "TDD" })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  }
  else if(isDateFilterTicked){
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    console.log("filter is ticked: start date and end date:", startDate, endDate);
    AcceptedPaperData.find({ title: { $regex: search, $options: "i" }, year :{$gte: startDate , $lte: endDate}  })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  }
  else{
    console.log("filter is not clicked doing regular searching.");
    AcceptedPaperData.find({ title: { $regex: search, $options: "i" }})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  }

 
});

router.post("/papercontroller/addarticle", (req, res) => {
  //http://localhost:8080/api/acceptedpapercontroller/addarticle
  console.log("Trying to add a paper");
  const data = req.body;
  const newAcceptedPaperData = new AcceptedPaperData(data);
  newAcceptedPaperData.save((error) => {
    if (error) {
      res.status(500).json({
        msg: "Internal Server Error.",
      });
      return;
    }
    return res.json({
      msg: "Paper Added.",
    });
  });
});

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

module.exports = router;
