const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userid: String,
    name: String,
    email: String,
    dob: String,
    userrole: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const UserInfo = mongoose.model('Users', UserSchema);

module.exports =  UserInfo;