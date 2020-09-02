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
            console.log('error: ', daerrorta);
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
    UserData.find({email : data.email}, function (err, docs){
        if(docs.length){
            res.json({
                msg:"Email already exists"
            });
        }else{
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
    

    // newUserData.save((error) => {
    //     if (error) {
    //         res.status(500).json({ msg: 'Sorry, internal server errors' });
    //         return;
    //     }
    //     // BlogPost
    //     return res.json({
    //         msg: 'Your data has been saved!!!!!!'
    //     });
    // });
});


router.get('/usercontroller/default', (req, res) => {
    const data =  {
        username: 'testing',
        age: 5
    };
    res.json(data);
});



module.exports = router;