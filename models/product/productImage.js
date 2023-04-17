const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productImageSchema = new mongoose.Schema(
    {
       
        image :{
           // required : true ,
            type: String
        },
        sort_order:{
            //required : true ,
            type:String
        },
        date_added :{
        //required : true ,
            type:Date
        },
        date_modified :{
            //required : true ,
            type:Date
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    }
);
module.exports = mongoose.model("ProductImage" ,productImageSchema)