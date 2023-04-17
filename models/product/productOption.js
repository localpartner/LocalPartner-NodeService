const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productOptionSchema = new mongoose.Schema(
    {
        productId:{
            required : true ,
            type: Number
        },
        optionId :{
            required : true ,
            type: Number
        },
        value :{
            required : true ,
            type:String
        },
        require :{
            required : true ,
            type : Boolean
        },
        date_added :{
            required : true ,
            type:Date
        },
        date_modified :{
            required : true ,
            type:Date
        }
    }
);
module.exports = mongoose.model("ProductOption" ,productOptionSchema)