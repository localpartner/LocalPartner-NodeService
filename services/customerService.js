const mongoose = require("mongoose"); 

const customerSchema = require("../models/customer/customer");
const AuthUtils = require("../utils/authUtils");

const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']

const createCustomer = async (customer) =>{
    let custSchema = new customerSchema(customer);
    return await custSchema.save();
}

const getCustomer = async (customerMobile)=>{
    let filter = {isDeleted:false,mobile:customerMobile};    
    return await customerSchema.findOne(filter).select(skipColumns).lean();
}

const getAllCustomers = async (all,sortObj) =>{
    let filter = {isDeleted:false};
    if (all===false){
        filter = {isDeleted:false,status:true};
    }
    return await customerSchema.find(filter).sort(sortObj).select(skipColumns).lean();
}

const updateCustomer = async (customerMobile,updatedObj)=>{
    let filter = {isDeleted:false,mobile:customerMobile};
    return await customerSchema.findOneAndUpdate(filter, updatedObj);
}

const deleteCustomer = async (customerMobile)=>{
    let filter = {isDeleted:false,mobile:customerMobile};
    return await customerSchema.findOneAndUpdate(filter, {'isDeleted': true  });
}

exports.createCustomer = createCustomer;
exports.getCustomer = getCustomer;
exports.getAllCustomers = getAllCustomers;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;