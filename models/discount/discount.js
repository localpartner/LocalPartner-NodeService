const mongoose = require("mongoose");

const discount = new mongoose.Schema(
    {
        name :{
            require : true,
            type : String
        },
        date_added :{
            require : true,
            type : Date 
        },
        date_modified :{
            require : true,
            type : Date
        },
        status:{
            require : true,
            type: Boolean
        }
    }
);
module.exports = mongoose.model("Discount" ,discount)