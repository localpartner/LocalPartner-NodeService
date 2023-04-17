const mongoose = require("mongoose");
const { Schema } = mongoose;
const RolesSchema = new mongoose.Schema(
    {
       roleName:{
            type : String,
            require : true,
            default: ''
           
        },
        accessModuleId :{
            // type : String,
            type : [String],
            required :  true
        },       
        storeId : { 
            type: mongoose.Types.ObjectId,
            ref: "Stores"
        },
        active :{
            type:Boolean ,
            required : true,
            default : true
         
        },
        isDeleted :{
            required : true,
            type : Boolean,
            default : false
          
        }      
    },
    { timestamps: true }
);

module.exports = mongoose.model("Roles" ,RolesSchema)