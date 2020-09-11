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
  // var data = {
  //         paper_name: "Cloud Computing Test",
  //         author_name: "Moneky",
  //         date: "07/09/2020",
  //         doi: "1010101010101",
  //         link: "xxx"
  //     }
  // const newAcceptedPaperData = new AcceptedPaperData(data2);
  //         newAcceptedPaperData.save((error) => {
  //             if(error){
  //                 res.status(500).json({
  //                     msg:"Internal Server Error."
  //                 })
  //                 return;
  //             }
  //             return res.json({
  //                 msg:"Paper Added."
  //             });
  //         })
});

router.post("/papercontroller/addarticle"),
  (req, res) => {
    // // const data = req.body;
    // // console.log("new document", data);
    // const newAcceptedPaperData = new AcceptedPaperData(data);
    // //saves the new user to the database
    // newAcceptedPaperData.save((error) => {
    //   if (error) {
    //     res.status(500).json({
    //       msg: "Error.",
    //     });
    //     return;
    //   }

    //   return res.json({
    //     msg: "Document Added.",
    //   });
    // });
    const data = {
      username: "testing",
      age: 5,
    };
    res.json(data);
  };

module.exports = router;
