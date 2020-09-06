const express = require('express');

const router = express.Router();

const UserData = require('../database/user');


// Routes
router.get('/usercontroller/getuser', (req, res) => {
//http://localhost:8080/api/usercontroller/getuser?userrole=Admin
const query = req.query
    
    UserData.find({query})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/usercontroller/getuser/:userrole', (req, res) => {
    //http://localhost:8080/api/usercontroller/getuser/Admin or User
    const role = req.params.userrole;
        
        UserData.find({userrole: role})
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

router.post('/usercontroller/newregistereduser', (req, res) => {
    const data = req.body;    
    const newUserData = new UserData(data);
    //Checks whether there is an existing email address in the database before adding.
    UserData.find({email : data.email}, function (err, docs){
        if(docs.length){
            res.json({
                msg:"Email already exists"
            });
        }
        else{
            //Saves userdata if there is no existing email address in the database.
            newUserData.save((error) => {
                if(error){
                    res.status(500).json({
                        msg:"Internal Server Error."
                    })
                    return;
                }
                return res.json({
                    msg:"User Added."
                });
            })
        }
    })
});


router.get('/usercontroller/default', (req, res) => {
    const data =  {
        username: 'testing',
        age: 5
    };
    res.json(data);
});


module.exports = router;