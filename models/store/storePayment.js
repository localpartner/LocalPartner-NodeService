const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const storePaymentSchema = new mongoose.Schema(
    {
        storeId :{
            require : true,
            type : Number
        },
        orderId:{
            require : true,
            type :Number
        },
        description :{
            maxlength: 2000,
            require : true,
            type : String
        },
        amount :{
            require : true,
            type :String
        },
        sub_Total :{
            require : true,
            type : String
        },
        date_added :{
            require : true,
            type : Date
        },
        transaction_Status :{
            require : true,
            type : Boolean
        }
    }
);
module.exports = mongoose.model("StorePayment" ,storePaymentSchema)