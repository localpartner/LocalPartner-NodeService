const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema(
    {
        
        storeId : { 
            type: mongoose.Types.ObjectId,
            ref: "Stores"
        },
        userId : {
            type: mongoose.Types.ObjectId,
            required:true,
            ref:"Users"
        },
        roleId :{
            type: mongoose.Types.ObjectId,
            required:true,
            ref:"Roles"
        },       
        active :{
            type:Boolean ,
            required : true,
            default : true            
        },
        isDeleted :{
            required : true,
            type : Boolean,
            default : false,
        }
       
    },
    {collection: 'userRoles' },
    { timestamps: true }
);
module.exports = mongoose.model("userRole" ,userRoleSchema)