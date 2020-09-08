const express = require('express');

const router = express.Router();

const UserData = require('../database/user');
const { json } = require('express');
const authenticate = require('./authcontroller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Routes
// router.get('/usercontroller/getuser', authenticate, (req, res,next) => {
// //http://localhost:8080/api/usercontroller/getuser?userrole=Admin
// const query = req.query
    
//     UserData.find({query})
//         .then((data) => {
//             console.log('Data: ', data);
//             //res.json(data);
//             res.json({
//                 message:'User data:',
//                 data
//             });
//         })
//         .catch((error) => {
//             console.log('error: ', error);
//         });
// });

router.get('/usercontroller/getuserdata',authenticate, (req, res) => {
    //http://localhost:8080/api/usercontroller/getuser/Admin or User
    const role = req.body.role;
        
        UserData.find({userrole: role})
            .then((data) => {
                console.log('Data: ', data);
                res.json(data);
            })
            .catch((error) => {
                console.log('error: ', daerrorta);
            });
    });

router.get('/usercontroller/getuser/:userrole',authenticate, (req, res) => {
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

router.post('/usercontroller/login', (req,res,next) =>{
    //Takes in the email and the password of the user for the login process
   const username = req.body.username;
   const password = req.body.password
//    const currentUserData = new UserData(data);
   UserData.findOne({$or: [{user_name:username}, {email:username}]})
   .then(user =>{
       if(user){
            bcrypt.compare(password, user.password, function(err,result){
                if (err) {
                    res.json({
                        //error:err
                        message:'Internal Server Error'
                    });                    
                }
                if(result){
                      let token = jwt.sign({name:user.email}, 'verySecretValue', {expiresIn:'1h'});
                      res.json({
                          message:'Login Successful!',
                          token //is the same as token:token
                      });  
                }
                else{
                    res.json({
                        message:'Password does not match!'
                    });
                }
            })
       }
       else{
            res.json({
                message:"No user found!"
            });
       }
   })
//    UserData.find({email:data.email , password:data.password}, function(err,docs){
//        if(docs.length){
//         res.json({
//             msg:"Login Successful"
//         });
//         return;           
//        }
//        else{
//             if(error){
//                 res.status(500).json({
//                     msg:"Internal Server Error"
//                 });
//                 return;
//             }
            
//             res.json({
//                 msg:"Email or Password is invalid."
//             });
//             }
//     })
});
    

router.post('/usercontroller/newregistereduser', (req, res) => {
    const data = req.body;    
    
    //Checks whether there is an existing email address in the database before adding.
    UserData.find({email : data.email}, function (err, docs){
        if(docs.length){
            res.json({
                msg:"Email already exists"
            });
            return;
        }
        else{
            //Saves userdata if there is no existing email address in the database.
            //Hashes the plaintext password and saves the hashed password onto the user's profile.
            bcrypt.hash(req.body.password, 10, function(err,hashedPass){
                if(err){
                    res.json({
                        error:err
                    })
                }

                data.password = hashedPass;
                const newUserData = new UserData(data); 
                //saves the new user to the database
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
            });
          
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