const mongoose = require("mongoose"); 

const SpecificationSchema = require("../models/product/specification");
const AuthUtils = require("../utils/authUtils");

const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']

const createSpecification = async (specification) =>{
    let specificationSchema = new SpecificationSchema(specification);
    return await specificationSchema.save();
}

const getSpecification = async (code)=>{
    let filter = {code:code};    
    return await SpecificationSchema.findOne(filter).select(skipColumns).lean();
}

const getAllSpecifications = async (all,sortObj) =>{
    let filter = {isDeleted:false};
    if (all===false){
        filter = {isDeleted:false,status:true};
    }
    return await SpecificationSchema.find(filter).sort(sortObj).select(skipColumns).lean();
}

const updateSpecification = async (code,updatedObj)=>{
    let filter = {isDeleted:false,code:code};
    return await SpecificationSchema.findOneAndUpdate(filter, updatedObj);
}

const deleteSpecification = async (code)=>{
    let filter = {isDeleted:false,code:code};
    return await SpecificationSchema.findOneAndUpdate(filter, {'isDeleted': true  });
}

const getAllSpecificationGroups = async() => {
    let filter = {isDeleted:false};
    return await SpecificationSchema.find(filter).distinct("specificationGroup")
   
}

exports.getAllSpecifications = getAllSpecifications;
exports.createSpecification = createSpecification;
exports.getSpecification = getSpecification;
exports.deleteSpecification =deleteSpecification;
exports.updateSpecification = updateSpecification;
exports.getAllSpecificationGroups = getAllSpecificationGroups;
