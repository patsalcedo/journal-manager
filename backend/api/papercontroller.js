const express = require("express");

const router = express.Router();

const AcceptedPaperData = require("../database/acceptedpaper");

// Routes
router.get("/papercontroller/getsearch", (req, res) => {
  //http://localhost:8080/api/acceptedpapercontroller/getsearch?searchterm
  const search = req.query.search;
  const isDateFilterTicked = req.query.dateFilter;
  const isOperatorFilterTicked = req.query.operatorFilter;

  console.log(
    "Search Term :" +
      search +
      " is date ticked: " +
      isDateFilterTicked +
      " is operator ticked: " +
      isOperatorFilterTicked
  );
  if (isOperatorFilterTicked && isDateFilterTicked) {
    const filterValue = req.query.filterValue;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    console.log("filter is ticked: method to filter is :", filterValue);
    console.log(
      "filter is ticked: start date and end date:",
      startDate,
      endDate
    );
    AcceptedPaperData.find({
      title: { $regex: search, $options: "i" },
      method: "TDD",
      year: { $gte: startDate, $lte: endDate },
    })
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } else if (isOperatorFilterTicked) {
    const filterValue = req.query.filterValue;
    console.log("filter is ticked: method to filter is :", filterValue);
    AcceptedPaperData.find({
      title: { $regex: search, $options: "i" },
      method: "TDD",
    })
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } else if (isDateFilterTicked) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    console.log(
      "filter is ticked: start date and end date:",
      startDate,
      endDate
    );
    AcceptedPaperData.find({
      title: { $regex: search, $options: "i" },
      year: { $gte: startDate, $lte: endDate },
    })
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } else {
    console.log("filter is not clicked doing regular searching.");
    AcceptedPaperData.find({ title: { $regex: search, $options: "i" } })
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

  AcceptedPaperData.find({ key: data.key }, function (err, docs) {
    if (docs.length) {
      res.json({
        message: "Paper with that id is already in the database.",
      });
      return;
    } else {
      const newAcceptedPaperData = new AcceptedPaperData(data);
      newAcceptedPaperData.save((error) => {
        if (error) {
          res.status(500).json({
            message: "Internal Server Error.",
          });
          return;
        }
        return res.json({
          message: "Paper Added.",
        });
      });
    }
  });
});

router.get("/papercontroller/getfilteredsearch", (req, res) => {
  //http://localhost:8080/api/acceptedpapercontroller/getsearch?searchterm

  const seType = req.query.seType === undefined ? "" : req.query.seType;
  // claims = claims
  const claims =
    req.query.claims === undefined ? "" : req.query.claims.split(",");
  const startDate =
    req.query.startDate === undefined ? "1990" : req.query.startDate;
  const endDate = req.query.endDate === undefined ? "2020" : req.query.endDate;
  
  console.log("passed anoter:", claims);

  if (seType === "" && claims === "") {
    AcceptedPaperData.find({
      method: { $regex: seType, $options: "i" },
      year: { $gte: startDate, $lte: endDate },
    })
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } else if (claims === "") {
    AcceptedPaperData.find({
      method: { $regex: seType, $options: "i" },
      year: { $gte: startDate, $lte: endDate },
    })
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } else {
    console.log("hitting the else statement and anote is:", claims);
    AcceptedPaperData.find({
      $and: [
        {
          //$or: [{ claims: { $in: claims } }],
          // $or: [{ anote: { $in: [/^great/] } }],
          $or: [{ number: { $in: claims } }],
        },
        { type_of_evidence: { $regex: seType, $options: "i" } },
        { year: { $gte: startDate, $lte: endDate } },
      ],
    }).then((data) => {
      return res.json(data);
    });
  }
});

module.exports = router;
