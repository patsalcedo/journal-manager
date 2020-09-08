const mongoose = require('mongoose');
var moment  = require('moment');
var fomatted_date = moment().format('DD/MM/YYYY');
// Schema
//Bob 
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    user_name: {
        type:String,
        lowercase: true,
        trim:true
    },
    first_name: {
        type:String,
        lowercase: true,
        trim:true
    },
    last_name: {
        type:String,
        lowercase: true,
        trim:true
    },
    email: {
        type:String,
        lowercase: false,
        trim:true
    },
    dob: {
        type:String,
        lowercase: true
    },
    user_role: {
        type:String,
        default: 'user',
        lowercase: true,
        trim:true
        
    },
    password:{
        type:String,
        lowercase:false
    },
    date: {
        type: String,
        default: fomatted_date
    }

});

// Model
const UserInfo = mongoose.model("Users", UserSchema);

module.exports = UserInfo;
