const mongoose = require('mongoose');

// Schema
//Bob 
const Schema = mongoose.Schema;

const AcceptedPaperSchema = new Schema({
    paper_name: {
        type:String
    },
    author_name: {
        type:String
    },
    date: {
        type:String
    },
    doi: {
        type:String
    },
    link:{
        type:String,
        lowercase:false
    }
});

// Model
const AcceptedPaperInfo = mongoose.model("Accepted Papers", AcceptedPaperSchema)

module.exports = AcceptedPaperInfo;
