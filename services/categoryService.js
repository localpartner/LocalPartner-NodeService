const CategorySchema = require("../models/category/category");
const mongoose = require("mongoose"); 
const AuthUtils = require("./../utils/authUtils");
const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt',"-subcategories._id"]

const isDuplicateCategory = async (code,parentCategory) =>{
    let filter = {'code':code,'isDeleted': false};
    
    if(parentCategory){
        filter = {$and:[ {'code':parentCategory}, {'subcategories.code':code}]};
        let array =  await CategorySchema.find(filter);
        if(array && array.length == 0 ){
            return false;
        }else {
            let flag =false;
            for(let i =0;i<array.length;i++){
                let itm = array[i];
                if(itm.subcategories && itm.subcategories.length>0){
                    let obj = itm.subcategories.find(element => element.isDeleted==false && element.code == code );
                    if(obj)
                    {
                        flag=true;
                        break;
                    }
                }
    
            }
            return flag;
        }
    }else{
        let array =  await CategorySchema.find(filter);
        if(array && array.length == 0 ){
            return false;
        }else {
            return true;
        }
    }
}

const getCategory = async (code,parentCategory)=>{
    let filter = {isDeleted:false,code:code};
    let category;
    if(parentCategory && parentCategory !=""){
        filter = {isDeleted:false,code:parentCategory};
        category = await CategorySchema.findOne(filter).select(skipColumns).lean();
        //console.log (' if category');
        //console.log (category);
        if(category && category.subcategories){
            category.subcategories = category.subcategories.filter((ele)=>{
                return ele.isDeleted === false && ele.code ==code;
            });
        }
    }else{
        category = await CategorySchema.findOne(filter).select(skipColumns).lean();
        //console.log (' else category');
        //console.log (category);
        if(category && category.subcategories){
            category.subcategories = category.subcategories.filter((ele)=>{
                return ele.isDeleted === false;
            });
        }
    }
    return category;
}

const deleteCategory = async (code,parentCategory)=>{
    let filter = {isDeleted:false,code:code};
    if(parentCategory && parentCategory !=""){
        filter = {isDeleted:false,code:parentCategory};
        
        //console.log("Both category and parent");
        let updated =  await  CategorySchema.findOneAndUpdate(
            {code:parentCategory}, 
            {   
            $set: {"subcategories.$[el].isDeleted": true } 
            },
            { 
            arrayFilters: [{ "el.code": code }],
            new: true
            });
        //console.log(updated);
        return updated;
    }else{
        //console.log("Only category");
        updated = await CategorySchema.findOneAndUpdate(filter, {'isDeleted': true  });
        //console.log(updated);
        return updated;
    }
}

const updateCategory = async (code,parentCategory,updatedObj)=>{
    let filter = {isDeleted:false,code:code};
    if(parentCategory && parentCategory !=""){
        filter = {isDeleted:false,code:parentCategory};
        let newObj = {"subcategories.$[el].status": updatedObj.status }
        if(updatedObj.status===undefined){
            newObj = {"subcategories.$[el].name": updatedObj.name,"subcategories.$[el].description": updatedObj.description }
        }
        
        let updated =  await  CategorySchema.findOneAndUpdate(filter, 
        {   
            $set: newObj
        },
        { 
          arrayFilters: [{ "el.code": code }],
          new: true
        } );
        return updated;
    }else{
        return await CategorySchema.findOneAndUpdate(filter, updatedObj);
    }
}
const getAllCategories = async (all) =>{
    let filter = {isDeleted:false};
    if (all===false){
        filter = {isDeleted:false,status:true};
    }
    let categories = await CategorySchema.find(filter).select(skipColumns).lean();
    return categories.map((ele)=>{
        ele.subcategories = ele.subcategories ? ele.subcategories.filter((sub)=>{
            return sub.isDeleted ==false;
        }): [];
        ele.subcategories = ele.subcategories.map((sub)=>{
            delete sub.isDeleted
            return sub;
        })
        return ele;
    })
}

const createCategory = async (category,parentCategory) =>{
    // check if code is present or not. if present throw Exception
    let temp = parentCategory
    if(parentCategory){
        temp = parentCategory.toUpperCase()
    }

    let existing = await isDuplicateCategory(category.code.toUpperCase(),temp);
    if(existing == true){
        throw new Error("Duplicate Category Code")
    }
    if(parentCategory && parentCategory !=""){
        let filter = {isDeleted:false,code:parentCategory};
        let subCategory = Object.assign({},category,{isDeleted:false})
        return await CategorySchema.findOneAndUpdate(filter, { $push: { subcategories: category  } },);
    }else{
        let categorySchema = new CategorySchema(category);
        return await categorySchema.save();
    }
}


exports.getAllCategories = getAllCategories;
exports.createCategory = createCategory;
exports.getCategory = getCategory;
exports.deleteCategory =deleteCategory;
exports.updateCategory = updateCategory;
