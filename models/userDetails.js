const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserDetails = new mongoose.Schema(
    {
       firstName:{
            type : String,
            require : true,
            default: ''
           
        },
        lastName :{
            type : String,
            require : true,
            default: ''
        },       
        mobile :{
            type : Number          
           
        },
        role :{
            type : Schema.Types.ObjectId,
            require :  false          
        },
        storeId:{
            type: Schema.Types.ObjectId,
        }         

      
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserDetails" ,UserDetails)