const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new mongoose.Schema(
    {
        name:  {type: String,trim: true,required: true, maxlength: 32},
        code:  {type: String,trim: true,required: true, maxlength: 20,uppercase: true},
        description:  {type: String},
        subcategories:{ 
            type: [
                    {
                        name:  {type: String,trim: true,required: true, maxlength: 32},
                        code:  {type: String,trim: true,required: true, maxlength: 20,uppercase: true, sparse:true},
                        description:  {type: String},
                        //navigation: {type: Number},        
                        isDeleted :{require : true,type : Boolean,default: false},
                        status: {type: Boolean,default: true,require : true }                       
                    }
                ]
        },
        //navigation: {type: Number},        
        isDeleted :{require : true,type : Boolean,default: false},
        status: {type: Boolean,default: true,require : true }
        
    },
    { timestamps: true }
)
module.exports = mongoose.model("Category" ,categorySchema);