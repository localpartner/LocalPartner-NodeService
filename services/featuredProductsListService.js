const { truncate } = require("lodash");
const mongoose = require("mongoose"); 

const FeaturedProductsListSchema = require("../models/product/featuredProductsList");
const AuthUtils = require("../utils/authUtils");
const ProductService = require("../services/productService")

const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']

exports.createUpdateFeaturedProductsList = async (newProdList) =>{
    let filter = {};
    let featProdListSchema = new FeaturedProductsListSchema(newProdList);
    return await FeaturedProductsListSchema.findOneAndUpdate(filter, newProdList, {
        new: true,
        upsert: true // Make this update into an upsert
      });
}

exports.getAllFeaturedSpecialProductsList= async (skip, limit) =>{
    let filter = {isDeleted:false};
    return await FeaturedProductsListSchema.find(filter)
                                .skip(skip)
                                .limit(limit)
                                .select(skipColumns);
}

exports.getFeaturedProductsList= async (listType, skip, limit) =>{
    let filter = {isDeleted:false};
    prodList = await FeaturedProductsListSchema.find(filter)
                                .skip(skip)
                                .limit(limit)
                                .select(skipColumns);
    if (!prodList) {
        return undefined;
    }
    //prodList = prodList.toObject();
    //console.log('S:getFeaturedProductsList    prodList=',prodList);
    let newItems = prodList[0].products.map(async (item)=>{
        let retItem = Object.assign({},item.toJSON())
        // console.log('S:getFeaturedProductsList    item=',item);
        // console.log('S:getCartDetails    retItem=',retItem);
        // console.log('S:getCartDetails    listType', listType, 'item.code=',item.code, 'item.isFeatured=',item.isFeatured, 'item.isSpecial=',item.isSpecial);
        if ((listType === "Featured") && (item.isFeatured === false)) {
            return;
        } 
        if ((listType === "Special") && (item.isSpecial === false)) {
            return;
        }
        let doc = await ProductService.getActiveProduct(item.code);
        //console.log('doc=',doc);
        if(doc){
            let prod = doc.toObject();
            //console.log("prod=" , prod);
            //let unitPrice = prod.price;
            // console.log("cart item : " , item)
            retItem["name"] = prod.name;
            retItem["code"] = prod.code;
            retItem["units"] = item.units;
            retItem["unitPrice"] = prod.price;

            // console.log('S:getCartDetails    item.code=',item.code, 'so far 2 retItem=',retItem);

            let image = prod.images.find((img)=>{
                return img.primaryImage==true;
            })
            retItem["image"] = image;

            if(item.options){
                retItem['options'] = item.options;
            }
            // console.log('S:getCartDetails    item.code=',item.code, 'so far 4 retItem=',retItem);
            
            if(prod.discount){
                retItem["discount"] = prod.discount;
            }
            // console.log('S:getCartDetails    item.code=',item.code, 'so far 5 retItem=',retItem);
            if(prod.specials){
                retItem["specials"] = prod.specials;
            }
            
            //console.log('S:getFeaturedProductsList    retItem=',retItem);
            return retItem;
            
        }else {
            throw new Error("Product Not found");
        }
    })
    newItems = await Promise.allSettled(newItems);
    //console.log('S:getFeaturedProductsList    newItems=',newItems);
    newItems = newItems.map((newItem)=>{
        return newItem.value;
    })
    //console.log('S:getFeaturedProductsList    newItems=',newItems);
    return newItems;
}

