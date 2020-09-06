const express = require('express');

const router = express.Router();

const AcceptedPaperData = require('../database/acceptedpaper');


// Routes
router.get('/papercontroller/getpaper', (req, res) => {
//http://localhost:8080/api/papercontroller/getpaper?searchterm
const query = req.query
    
    AcceptedPaperData.find({query})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});


module.exports = router;