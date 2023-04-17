const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;

const featuredProductsListSchema = new mongoose.Schema(
    {
//        listType: {required: true, type: String, default:"Featured"}, // can be "Featured", "Special"
        products: 
        [
            {
                isFeatured: {type: Boolean,default:false,required:false},
                isSpecial: {type: Boolean,default:false,required:false},
                code: {type:String},
                storeId: {type:String},
                storeName: {type:String}
            }
        ],
    },
    { timestamps: true }
    , { _id : false }
    );

module.exports = mongoose.model("FeaturedProductsList", featuredProductsListSchema);

