const express = require('express');

const router = express.Router();

const UserData = require('../database/user');


// Routes
router.get('/usercontroller/getuser', (req, res) => {

    UserData.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/usercontroller/test', (req,res) =>{
    const data ={
        username: 'testing',
        age: 10
    };
    res.json(data);
    });

router.post('/usercontroller/save', (req, res) => {
    const data = req.body;

    const newUserData = new UserData(data);

    newUserData.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});


router.get('/usercontroller/default', (req, res) => {
    const data =  {
        username: 'testing',
        age: 5
    };
    res.json(data);
});



module.exports = router;