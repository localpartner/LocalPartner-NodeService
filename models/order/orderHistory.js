const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderHistorySchema = mongoose.Schema(
    {
        orderId :{
            require : true,
            type: Number
        },
        orderStatusId :{
            require : true,
            type: Number
        },
        notify :{
            require : true,
            type: String
        },
        comment :{
            require : true,
            type: String
        },
        date_added :{
            require : true,
            type: Date
        },
        sellerId :{
            require : true,
            type: Number
        }
    }
)
module.exports = mongoose.model("OrderHistory" , orderHistorySchema);