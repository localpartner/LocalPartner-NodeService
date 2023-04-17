const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderShipmentSchema = mongoose.Schema(
    {
        orderId :{
            require : true,
            type: Number
        },
        shippingCourierId :{
            require : true,
            type: Number
        },
        trackingNumber :{
            require : true,
            type: Number
        },
        date_added :{
            require : true,
            type: Date
        }
    }
)
module.exports = mongoose.model("OrderShipment" , orderShipmentSchema);