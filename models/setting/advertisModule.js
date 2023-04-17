const mongoose = require("mongoose");

const advertisSchema = new mongoose.Schema(
    {
        title : {
            type : String,
        },
        image: {
           type : String,
        },
        link: {
            type: String
        },
        sequence: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false
        },
        isDelete:{
            type : Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },{
        timestamps:true 
    },{
        collection : 'AdvertisImages'
    }
);
module.exports = mongoose.model("AdvertisImages",advertisSchema);