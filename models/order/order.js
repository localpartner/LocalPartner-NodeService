const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

const customerAddressSchema = new mongoose.Schema(
    {
        addressLine1: {type:String, required: [true,"addressLine1 is required"]},
        addressLine2: {type:String, required: false},
        city    : {type:String, required: [true,"city is required"]},
        state   : {type:String, required: [true,"state  is required"]},
        pincode : {type:String, required: [true,"pincode is required"]},
        country : {type:String, required: [true,"country  is required"]},
    }, 
    { _id : false }
);

const paymentDetailsSchema = new mongoose.Schema(
    {
        paymentType: {type: String, required: false},
        paymentCardHolderName: {type: String, required: false},
        paymentCardNumber: {type: String, required: false},
        paymentAmount :{type: Number, required: false},
    }, 
    { _id : false }
);

const orderSchema = mongoose.Schema(
    {
        orderId: { require : [true,"orderId is required"], type: Number },
        mobile: { require : [true,"mobile is required"], type: String },
        billingAddress: {type:customerAddressSchema, required: false},
        shippingAddress: {type:customerAddressSchema, required: false},
        paymentDetails: {type:paymentDetailsSchema, required: false},
        products: [
            {
                code: {type: String, required: [true,"product code is required"]},
                quantity: {type: Number, required: [true,"product quantity is required"]},
                unitPrice: {type: Number, required: [true,"unit price is required"]},
                optionName: {type: String,required:false},
                optionValue: {type: String,required:false}
            }
        ],
        orderTotal :{type: Number, required: false},
        orderStatus: {
            type: String, required: false,
            default: "Pending",
            enum: ["Not Processed", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
        },
        orderNote: {type: String, required: false},
        isDeleted: {require: true, type: Boolean, default: false},
        status: {type: Boolean, default: true, require: true }
        /*
        invoiceNo :{
            require : true,
            unique : true,
            trim : true,
            type: Number
        },
        invoicePrefix :{
            require : true,
            type: String
        },
        customerId :{
            require : true,
            type: Number
        },
        firstName :{
            type: String
        },
        lastName :{
            type: String
        },
        email :{
            require : true,
            trim : true ,
            unique: true,
            type: String
        },
        mobile :{
            unique: true,
            require : true,
            trim : true,
            maxlength : 10,
            type: Number
        },
        sellerId :{
            require : true,
            type: String
        },
        status: {
            type: String,
            default: "Not processed",
            enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
        },
        payment_firstName :{
            require : true,
            type: String
        },
        payment_lastName :{
            require : true,
            type: String
        },
        payment_Company :{
            require : true,
            type: String
        },
        payment_address_1 :{
            require : true,
            type: String
        },
        payment_address_2 :{
            type: String
        },
        payment_city :{
            require : true,
            type: String
        },
        payment_pincode :{
            require : true,
            type: Number
        },
        payment_country :{
            require : true,
            type: String
        },
        payment_countryId :{
            require : true,
            type: Number
        },
        payment_method :{
            require : true,
            type: String
        },
        payment_transactionId :{
            require : true,
            type: Number
        },
        shipping_firstName :{
            require : true,
            type: String
        },
        shipping_lastName :{
            require : true,
            type: String
        },
        shipping_company :{
            require : true,
            type: String
        },
        shipping_address_1 :{
            require : true,
            type: String
        },
        shipping_address_2:{
            type: String
        },
        shipping_city :{
            require : true,
            type: String
        },
        payment_status: {
            require : true,
            type : Number
        },
        shipping_status : {
            require : true,
            type : Number
        }
        */
    },
    { timestamps: true }
)

orderSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'orderId'});

module.exports = mongoose.model("Order" , orderSchema);