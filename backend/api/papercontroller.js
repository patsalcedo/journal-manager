const express = require('express');

const router = express.Router();

const AcceptedPaperData = require('../database/acceptedpaper');

// Routes
router.get('/papercontroller/getsearch', (req, res) => {
//http://localhost:8080/api/acceptedpapercontroller/getsearch?searchterm
const search = req.query.search
console.log("Search Term :" + search )
    
    AcceptedPaperData.find({paper_name:{$regex: search, $options: 'i'}})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
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

module.exports = router;