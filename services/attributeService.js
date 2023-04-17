const AttributeSchema = require("../models/product/attribute");
const mongoose = require("mongoose"); 
const AuthUtils = require("./../utils/authUtils");
const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']



const getAttribute = async (name)=>{
    let filter = {isDeleted:false,name:name};    
    return await AttributeSchema.findOne(filter).select(skipColumns).lean();
    
}

const deleteAttribute = async (name)=>{
    let filter = {isDeleted:false,name:name};
    await AttributeSchema.findOneAndUpdate(filter, {'isDeleted': true  });
    
   return true;


}

const updateAttribute = async (name,updatedObj)=>{
    let filter = {isDeleted:false,name:name};
    await AttributeSchema.findOneAndUpdate(filter, updatedObj);
   return true;


}
const getAllAttributes = async (all,sortObj) =>{
    let filter = {isDeleted:false};
    if (all===false){
        filter = {isDeleted:false,status:true};
    }
    return await AttributeSchema.find(filter).sort(sortObj).select(skipColumns).lean();
   
}

const createAttribute = async (attribute) =>{
    let attributeSchema = new AttributeSchema(attribute);
    await attributeSchema.save();
   
    return true;

}


exports.getAllAttributes = getAllAttributes;
exports.createAttribute = createAttribute;
exports.getAttribute = getAttribute;
exports.deleteAttribute =deleteAttribute;
exports.updateAttribute = updateAttribute;
