const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  },  
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    addressId: { type: ObjectId, ref: "CustomerAddress" },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    //user: { type: ObjectId, ref: "User" }// old
    user: { type: ObjectId, ref: "Customer" },
    deletedAt :{
        type : Date,
    }
  },
  { timestamps: true }
);

// currently unused schema
//const Order = mongoose.model("Order", OrderSchema);

// module.exports = { Order, CartItem };
