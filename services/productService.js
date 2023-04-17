const { truncate } = require("lodash");
const mongoose = require("mongoose"); 
const manufacturer = require("../models/product/manufacturer");
const product = require("../models/product/product");

const ProductSchema = require("../models/product/product");
const AuthUtils = require("../utils/authUtils");
const productValidator = require("./../validator/productAttributeValidators")

const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']
const skipColumnsPartial = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt', 
                            '-tags', '-location', '-identification',  '-options',
                            '-highlights', '-features']
const skipColumnsPartialWithOptions = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt', 
                            '-tags', '-location', '-identification' ]

const createProduct = async (product) =>{
    let productSchema = new ProductSchema(product);
    return await productSchema.save();
}

const getProduct = async (code)=>{
    let filter = {isDeleted:false,code:code};    
    // return await ProductSchema.findOne(filter).select(skipColumns).lean();
    // removing lean for now since it skips getters
    let product = await ProductSchema.findOne(filter).select(skipColumns);
    if (!product) {
        return null;
    }
    product = product.toObject();
    if (!product.links.brand) {
        return product;
    }
    let manufacturer = await productValidator.getManufacturerDetails(product.links.brand);
    if (!manufacturer) {
        return product;
    } 
    let manuObj = {"manufacturer" : manufacturer};
    let retObj = {...product,...manuObj};
    return retObj;
}

const getActiveProduct = async (code)=>{
    let filter = {isDeleted:false,code:code,status:true};    
    // console.log ('S:getActiveProduct code=', code);
    // console.log ('S:getActiveProduct filter=',filter);
    // return await ProductSchema.findOne(filter).select(skipColumns).lean();
    // removing lean for now since it skips getters
    return await ProductSchema.findOne(filter).select(skipColumns);
    
}

const getAllProducts = async (targetStoreId, all,sortObj, skip, limit,queryParams) =>{
    let filter = {isDeleted:false};
    if (all===false){
        filter = {isDeleted:false, status:true};
    }
    if(targetStoreId){
        filter['storeId'] = targetStoreId;
    }
    if(queryParams){
        if(queryParams.storeId)
            filter['storeId'] = queryParams.storeId;
        if(queryParams.name)
            //filter['name'] = queryParams.name;
            filter['name']={ $regex: '.*' + queryParams.name + '.*',$options: 'i'  }
        if(queryParams.code)
            filter['code'] = queryParams.code;
    }
    return await ProductSchema.find(filter)
                                .skip(skip)
                                .limit(limit)
                                .sort(sortObj)
                                .select(skipColumns)
                                .populate('storeId', 'storeName');;
}

const getAllProductsPartial = async (all,sortObj, skip, limit,queryParams) =>{
    let filter = {isDeleted:false};
    if (all===false){
        filter = {isDeleted:false, status:true};

    }
    if(queryParams){
        if(queryParams.name)
            filter['name']={ $regex: '.*' + queryParams.name + '.*',$options: 'i'  }
        if(queryParams.category)
        filter['links.category']={$elemMatch: {code: queryParams.category}}
    }
    let prodObj =  await ProductSchema.find(filter)
                                .skip(skip)
                                .limit(limit)
                                .sort(sortObj)
                                .select(skipColumnsPartial)
                                .populate('storeId', 'storeName');
                                
    //return prodObj.toObject();
    return prodObj;
}

const updateProduct = async (code,updatedObj)=>{
    let filter = {isDeleted:false,code:code};
    return await ProductSchema.findOneAndUpdate(filter, updatedObj);
}

const deleteProduct = async (code)=>{
    let filter = {isDeleted:false,code:code};
    return await ProductSchema.findOneAndUpdate(filter, {'isDeleted': true  });
}


const fetchGroup = async (item) => {
    let spec = await productValidator.getSpecificationGroup(item.code);
    if (!spec) {
        console.log (`Bad Data in DB for specification ${item.code}`);
        return null;
    }
    let obj = Object.assign ({code:item.code,value:item.value}, {specificationGroup:spec.specificationGroup,name:spec.name});
    return obj;
}

async function populateSpecWithGroup (spec) {
    let newspec = [];
    if (spec && spec.length > 0) {
        newspec = await Promise.all(spec.map(fetchGroup));
    }
    return newspec;
}

function transposeBySpecGroup (spec) {
    let tspec = {};

    length = spec.length;
    for (let i=0; i<length; i=i+1) {
        let s = spec[i];
        if (tspec[s.specificationGroup]) {
            tspec[s.specificationGroup].push (s);
        }
        else {
            let array = [];
            array.push(s);
            tspec[s.specificationGroup] = array;
        }
    }
    let str =  JSON.stringify(tspec);
    return tspec;
};


const getProductPartial = async(code) => {
    let filter = {isDeleted:false,code:code};    
    let product = await ProductSchema.findOne(filter).select(skipColumnsPartialWithOptions).populate('storeId', 'storeName');
    if (!product) {
        return null;
    }
    product = product.toObject();
    currSpec = product.specifications;
    if(product.storeId && product.storeId !=null){
        let storeName = product.storeId.storeName
        product['storeName'] = storeName
        delete product.storeId
    }

    groupedSpec = await populateSpecWithGroup (currSpec);
    newSpec = transposeBySpecGroup (groupedSpec);
    let specObj = {"specifications" : newSpec};
    let retObj = {...product,...specObj};

    
    if(product.discount){
        let discountArray = product.discount.filter((dis)=>{
            dis.startDate.setHours(0,0,0,0);
            dis.endDate.setHours(0,0,0,0);
            let currentDate = new Date();
            return dis.startDate.getTime()<currentDate.getTime() && dis.endDate.getTime()> currentDate.getTime();
        })
        retObj["discount"] = discountArray;
    }
    if(product.specials){
        let specialArray = product.specials.filter((dis)=>{
            dis.startDate.setHours(0,0,0,0);
            dis.endDate.setHours(0,0,0,0);
            let currentDate = new Date();
            return dis.startDate.getTime()<currentDate.getTime() && dis.endDate.getTime()> currentDate.getTime();
        })
        retObj["specials"] = specialArray;
    }

    if (!product.links.brand) {
        return retObj;
    }
    let manufacturer = await productValidator.getManufacturerDetails(product.links.brand);
    if (!manufacturer) {
        return retObj;
    } 
    let manuObj = {"manufacturer" : manufacturer};
    let ret2Obj = {...retObj, ...manuObj};
    return ret2Obj;
}

exports.getAllProducts = getAllProducts;
exports.getAllProductsPartial = getAllProductsPartial;
exports.createProduct = createProduct;
exports.getProduct = getProduct;
exports.getActiveProduct = getActiveProduct;
exports.getProductPartial = getProductPartial;
exports.updateProduct =updateProduct;
exports.deleteProduct = deleteProduct;

