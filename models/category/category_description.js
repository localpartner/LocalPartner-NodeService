const mongoose = require("mongoose");

const categoryDescriptionSchema = new mongoose.Schema(
    {
        name:{
            required: true,
            type:String,
            trim : true
        },
        descrition:{
            type:String
        },
        mata_title:{
            required: true,
            type:String
        },
        meta_descrition:{
            required: true,
            type:String
        },
        meta_keyword:{
            required: true,
            type:String
        }
    }
)
module.exports = mongoose.model("categoryDescription" ,categoryDescriptionSchema);