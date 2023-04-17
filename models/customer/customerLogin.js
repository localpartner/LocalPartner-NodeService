const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerLoginSchema = new mongoose.Schema(
    {
        mobile :{
            unique: true,
            type:Number,
            maxlength : 10,
            require:true,
            trim :true
        },
        opt :{
            maxlength : 6,
            require:true,
            trim :true,
            type :Number
        },
        ip :{
            require : true,
            type:String
        },
        totalNo :{
            require : true,
            type :Number
        },
        date_added :{
            require : true,
            type:Date
        },
        date_modified :{
            require : true,
            type :Date
        }
    }
)
module.exports = mongoose.model("CustomerLogin" ,customerLoginSchema)