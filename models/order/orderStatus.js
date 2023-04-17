const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderStatusSchema = mongoose.Schema(
    {
        name :{
            require : true,
            trim : true ,
            type: String
        }
    }
)
module.exports = mongoose.model("OrderStatus" , orderStatusSchema);