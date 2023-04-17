const mongoose = require('mongoose');
const { ObjectId  } = mongoose.Schema;

const customerAddressSchema = new mongoose.Schema(
    {
        customerId :{ type: ObjectId,  ref: "Customer" },
        address:{
            type: String
        },
        country : String,
        fname   : String,
        lname   : String,
        nickname: String,
        email   : String,
        mobile  : String,
        city    : String,
        state   : String,
        pincode : String,
        date_added: {
            type: Date,
            default : Date.now
        },
        date_modified: {
            type: Date,
        },
        isDelete : {
            type : Boolean,
            default : false
        },
        deletedAt: {
            type: Date,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("CustomerAddress" ,customerAddressSchema);
