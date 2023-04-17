const { string } = require("joi");
const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;

const ProductOptionSchema = new mongoose.Schema({
    
    optionName: {type: String,required:[true,"Option Name  is required"]},
    optionValue: {type: String,required:[true,"Option Value is required"]},
    //lineTotal:{type: Number, get: v => (v/100).toFixed(2),set: v => v*100,required: [true,"Line Item Total is required"],default:0}
}, { _id : false });

const cartItemSchema = new mongoose.Schema({
    
    productCode: {type:String,required:[true,"Product is required"]},
    options:{type: [ProductOptionSchema], required:false},
    //unitPrice: {type:Number,required:[true,"Price is required"],get: v => (v/100).toFixed(2),set: v => v*100,default:0},
    units: {type:Number,required:[true,"Number of Unit is required"]},
    //lineTotal:{type: Number, get: v => (v/100).toFixed(2),set: v => v*100,required: [true,"Line Item Total is required"],default:0}
}, { _id : false });
const cartSchema = new mongoose.Schema(
    {
        // temporarily marking mobile number not required to allow for cart operations using cart id
        mobile:{ type: Number, unique: true/*,required:[true,"Customer Mobile is required"]*/ },
        items:{type: [cartItemSchema], required:false},
        //totalAmt:{type: Number, get: v => (v/100).toFixed(2),set: v => v*100,required: true,default:0},
        status: {type: Boolean, default: true, require: true },
        isDeleted: {require: true, type: Boolean, default: false},
    },
    { timestamps: true }
);
/*
{
    mobile: xxxx
    items: [
        {
            productCode: xyz - validate during creation
            optionName: 
            optionValue:
            units: 
        }
    ]
}
*/
cartSchema.set('toJSON', { getters: true, setters: true, virtuals: true});
cartSchema.set('toObject', { getters: true, setters: true, virtuals: true});

  /**validators */

  


module.exports = mongoose.model("Cart", cartSchema);

