const mongoose = require("mongoose");
const { Schema } = mongoose;
const storeUsersSchema = require("./storeUser");

const storeSchema = new mongoose.Schema(
    {
        storeName:{
            type : String,
        },
        address:{
            type : String,
        },
        status :{
            type:Boolean ,
            default : true,
        },
        isDelete :{
            //required : false,
            type : Boolean,
            default : false
           
        },
       
    },
    { timestamps: true }
);



module.exports = mongoose.model("Store" ,storeSchema);

