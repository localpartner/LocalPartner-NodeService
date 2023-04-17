const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;
var Schema = mongoose.Schema;

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: String,
        },
        product: {
            type: String,
        },
        deletedAt :{
            require : true,
            type : Date
        },
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = { Wishlist, wishlistSchema };

