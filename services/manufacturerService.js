const mongoose = require("mongoose"); 

const manufacturerSchema = require("../models/product/manufacturer");
const AuthUtils = require("../utils/authUtils");

const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']

const createManufacturer = async (manufacturer) =>{
    let manuSchema = new manufacturerSchema(manufacturer);
    return await manuSchema.save();
}

const getManufacturer = async (name)=>{
    let filter = {isDeleted:false,name:name};    
    return await manufacturerSchema.findOne(filter).select(skipColumns).lean();
}

const getAllManufacturers = async (all,sortObj) =>{
    let filter = {isDeleted:false};
    if (all===false){
        filter = {isDeleted:false,status:true};
    }
    return await manufacturerSchema.find(filter).sort(sortObj).select(skipColumns).lean();
}

const updateManufacturer = async (name,updatedObj)=>{
    let filter = {isDeleted:false,name:name};
    return await manufacturerSchema.findOneAndUpdate(filter, updatedObj);
}

const deleteManufacturer = async (name)=>{
    let filter = {isDeleted:false,name:name};
    return await manufacturerSchema.findOneAndUpdate(filter, {'isDeleted': true  });
}

exports.getAllManufacturers = getAllManufacturers;
exports.createManufacturer = createManufacturer;
exports.getManufacturer = getManufacturer;
exports.deleteManufacturer = deleteManufacturer;
exports.updateManufacturer = updateManufacturer;
