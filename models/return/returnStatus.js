const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema;

const returnStatusSchema = new mongoose.Schema(
    {
        name :{
            type : String ,
            required : true 
        }
    }
)
module.exports = mongoose.model("ReturnStatus" ,returnStatusSchema)