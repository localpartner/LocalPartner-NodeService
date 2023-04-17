const mongoose = require("mongoose"); 

const OrderSchema = require("../models/order/order");
const AuthUtils = require("../utils/authUtils");

const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']

const createOrder = async (order) =>{
    let orderSchema = new OrderSchema(order);
    return await orderSchema.save();
}

const getOrders = async (mobile)=>{
    let filter = {isDeleted:false,mobile:mobile};    
    return await OrderSchema.find(filter).select(skipColumns).lean();
}

const getOrderByID = async (mobile, orderId)=>{
    let filter = {isDeleted:false,mobile:mobile, orderId:orderId};    
    return await OrderSchema.findOne(filter).select(skipColumns).lean();
}

const updateOrder = async (mobile, orderId, updatedObj)=>{
    let filter = {isDeleted:false, mobile:mobile, orderId:orderId};
    return await OrderSchema.findOneAndUpdate(filter, updatedObj);
}

const deleteOrder = async (mobile, orderId)=>{
    let filter = {isDeleted:false, mobile:mobile, orderId:orderId};
    return await OrderSchema.findOneAndUpdate(filter, {'isDeleted': true  });
}

exports.createOrder = createOrder;
exports.getOrders = getOrders;
exports.getOrderByID = getOrderByID;
exports.deleteOrder = deleteOrder;
exports.updateOrder = updateOrder;
