const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productOptionValueSchema = new mongoose.Schema(
    {
        productOtiobId :{
            required : true ,
            type : Number
        },
        productId:{
            required : true ,
            type:Number
        },
        quantity :{
            required : true ,
            type:Number
        },
        price :{
            required : true ,
            type:Number
        },
        price_prefix:{
            required : true ,
            type :String
        },
        weigth:{
            required : true ,
            type: Number
        },
        date_added:{
            required : true ,
            type:Date
        },
        date_modified:{
            required : true ,
            type:Date
        }
    }
);
module.exports = mongoose.model("productOptionValue", productOptionValueSchema)