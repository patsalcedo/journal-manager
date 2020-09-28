const express = require("express");

const router = express.Router();

const AcceptedPaperData = require("../database/acceptedpaper");

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
