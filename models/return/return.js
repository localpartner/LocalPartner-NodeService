const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const returnSchema = new mongoose.Schema(
    {
        orderId :{
            type : Number,
            require: true
        },
        productId :{
            type : Number,
            require: true
        },
        customerId :{
            type : Number,
            require: true
        },
        return_Reason :{
            type : String,
            required : true
        },
        return_StatusId :{
            type : Number,
            required : true
        },
        Comment :{
            type : String,
            maxlength : 2000,
            required : true
        },
        date_added :{
            type : Date,
            required : true
        },
        date_modified :{
            type : Date,
            required : true
        }

    }
);
module.exports = mongoose.model("Return" ,returnSchema)