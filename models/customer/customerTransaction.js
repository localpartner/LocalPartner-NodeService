const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerTransactionSchema = new mongoose.Schema(
    {
        customerId :{
            require : true,
            type : Number
        },
        orderId :{
            require : true,
            type : Number
        },
        description :{
            require : true,
            maxlength : 2000,
            type : String
        },
        amount :{
            require : true,
            type : Number
        },
        date_added :{
            require : true,
            type : Date
        },
        date_modified :{
            require : true,
            type : Date
        }
    }
)
module.exports = mongoose.model("CustomerTransaction" ,customerTransactionSchema)