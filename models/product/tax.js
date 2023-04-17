const mongoose = require("mongoose");
/* Attribute   adde here in schema  ../Mangesh/..*/
const taxSchema = new mongoose.Schema(
    {
        taxName: {
            unique : true,
            require : true,
            type : String
        },
        taxValue: {
            require : true,
            type : String
        },
        taxDescription: {
            type: String,
        },
        status: {
            type: Number,
            default: 1
        },
        deletedAt :{
            type : Date,
        }
    },
    { timestamps: true }     
);

module.exports = mongoose.model("Tax", taxSchema);
