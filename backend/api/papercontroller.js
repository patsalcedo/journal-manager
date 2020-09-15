const express = require("express");

const router = express.Router();

const AcceptedPaperData = require("../database/acceptedpaper");

// Routes
router.get("/papercontroller/getsearch", (req, res) => {
  //http://localhost:8080/api/acceptedpapercontroller/getsearch?searchterm
  const search = req.query.search;
  console.log("Search Term :" + search);

  AcceptedPaperData.find({ paper_name: { $regex: search, $options: "i" } })
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.post("/papercontroller/addarticle", (req, res) => {
  //http://localhost:8080/api/acceptedpapercontroller/addarticle
  console.log("Trying to add a paper")   
  const data = req.body;
  const newAcceptedPaperData = new AcceptedPaperData(data);
          newAcceptedPaperData.save((error) => {
              if(error){
                  res.status(500).json({
                      msg:"Internal Server Error."
                  })
                  return;
              }
              return res.json({
                  msg:"Paper Added."
              });
          })
  });

module.exports = router;
