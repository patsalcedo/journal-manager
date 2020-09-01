const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const mongo_db_connectionstring='mongodb+srv://seer_db:itsmedio@seer.mwxsn.mongodb.net/<dbname>?retryWrites=true&w=majority';
const app = express();
const PORT = process.env.PORT || 8080; 

//Controllers
const usercontroller = require('./backend/api/usercontroller');

//Mongoose Connection
mongoose.connect(mongo_db_connectionstring || process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected', () =>{
    console.log('Mongoose is connected')
});

//import requires
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'client/build')));
app.use(morgan('tiny'));

//controller uses
app.use('/api',usercontroller)
    
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
    



