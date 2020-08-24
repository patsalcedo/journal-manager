const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

app.use(express.static("cd ../client/build"))
// HTTP request logger
app.use(morgan('tiny'));

app.get('/api', (req,res) =>{
const data ={
    username: 'testing',
    age: 10
};
res.json(data);
});

app.get('/api/name', (req,res) =>{
    const data ={
        username: 'jane doe',
        age: 38
    };
    res.json(data);
    });

    

    
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
    



