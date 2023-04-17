const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productAttributesSchema = new mongoose.Schema(
    {
        productId :{
            required : true ,
            type : Number
        },
        attributesId :{
            required : true ,
            type: Number
        },
        text :{
            required : true ,
            type:String
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
)
module.exports = mongoose.model("ProductAttributes" ,productAttributesSchema)