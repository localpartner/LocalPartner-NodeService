const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productDiscountSchema = new mongoose.Schema(
    {
        productId :{
            required : true ,
            type : Number
        },
        customer_group_id :{
            required : true ,
            type: Number
        },
        quantity : {
            required : true ,
            type:Number
        },
        priority :{
            required : true ,
            type:Number
        },
        price :{
            required : true ,
            type:Number
        },
        date_start:{
            required : true ,
            type : Date
        },
        date_end :{
            required : true ,
            type: Date
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("productDiscount" ,productDiscountSchema)