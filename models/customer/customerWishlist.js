const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const customerWishlistSchema = new mongoose.Schema(
    {
        customerId :{
            require : true,
            type:Number
        },
        productId :{
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
module.exports = mongoose.model("CustomerWishlist" ,customerWishlistSchema)