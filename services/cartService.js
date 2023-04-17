const CartSchema = require("../models/order/cart");
const ProductService = require("../services/productService")
const mongoose = require("mongoose"); 
const AuthUtils = require("./../utils/authUtils");
const skipColumns = ['-__v','-_id','-isDeleted','-createdAt','-updatedAt']
const lodash = require("lodash");
const verifyOptionDetails = (item,prod)=>{
    // console.log('S:verifyOptionDetails  item=', item, 'prod=',prod);
    if(item.optionName){
        if(item.optionValue==undefined){
            return false;
        }else{
            if(prod.options == undefined || prod.options.length==0){
                return false;
            }else{
                let option = prod.options.find((opt)=>{
                    return opt.displayName == item.optionName
                });
                
                if(option && option.data && option.data.length>0){
                    let optvalue = option.data.find((val)=>{
                        return val.value== item.optionValue
                    })
                    
                    if(optvalue){
                        item['price'] = optvalue.price
                        return true;

                    }else{
                        return false;
                    }

                }else{
                   return false;
                }
            }
        }
    }
}
const getCartDetails = async (mobile)=>{
    let filter = {mobile:mobile};
    let cartDetails;
    let retCart = {mobile:mobile,items:[]}
    // console.log ("S:getCartDetails    mobile=", mobile);
    cartDetails = await CartSchema.findOne(filter).select(skipColumns);
   
    if(cartDetails){
        cartDetails = cartDetails.toObject();
        // console.log('S:getCartDetails    cartDetails=',cartDetails);
        let newItems = cartDetails.items.map(async (item)=>{
            let retItem = Object.assign({},item)
            // console.log('S:getCartDetails    item=',item);
            // console.log('S:getCartDetails    retItem=',retItem);
            let doc = await ProductService.getActiveProduct(item.productCode);
            //console.log('doc=',doc);
            if(doc){
                let prod = doc.toObject();
                //let unitPrice = prod.price;
               // console.log("cart item : " , item)
                retItem["name"] = prod.name;
                retItem["productCode"] = prod.code;
                retItem["units"] = item.units;
                retItem["unitPrice"] = prod.price;

                // console.log('S:getCartDetails    item.productCode=',item.productCode, 'so far 2 retItem=',retItem);

                let image = prod.images.find((img)=>{
                    return img.primaryImage==true;
                })
                retItem["image"] = image;

               

                if(item.options){
                    let flag = true;
                    item.options.forEach(opt => {
                        flag = flag && verifyOptionDetails(opt,prod);
                       
                        
                    });
                    if(!flag){
                        throw new Error("Invalid Option")
                    }else{
                        retItem['options'] = item.options;
                    }
                }
                // console.log('S:getCartDetails    item.productCode=',item.productCode, 'so far 4 retItem=',retItem);
                
                if(prod.discount){
                    let discountArray = prod.discount.filter((dis)=>{
                        dis.startDate.setHours(0,0,0,0);
                        dis.endDate.setHours(0,0,0,0);
                        let currentDate = new Date();
                        return dis.startDate.getTime()<currentDate.getTime() && dis.endDate.getTime()> currentDate.getTime();
                    })
                    retItem["discount"] = discountArray;
                }
                // console.log('S:getCartDetails    item.productCode=',item.productCode, 'so far 5 retItem=',retItem);
                if(prod.specials){
                    let specialArray = prod.specials.filter((dis)=>{
                        dis.startDate.setHours(0,0,0,0);
                        dis.endDate.setHours(0,0,0,0);
                        let currentDate = new Date();
                        return dis.startDate.getTime()<currentDate.getTime() && dis.endDate.getTime()> currentDate.getTime();
                    })
                    retItem["specials"] = specialArray;
                }
                
                
                return retItem;
                
            }else {
                throw new Error("Product Not found");
            }
        })
        newItems = await Promise.allSettled(newItems);
        newItems = newItems.map((newItem)=>{
            return newItem.value;
        })
        cartDetails.items = newItems;
    }else{
        cartDetails = undefined;
    }
    // console.log('S:getCartDetails    returning cartDetails=',cartDetails);
    return cartDetails;
}

const deleteCart = async (cartid)=>{
    let filter = {isDeleted:false,id:cartid};
    return await CartSchema.findOneAndUpdate(filter, {'isDeleted': true  });
}

const createCart = async (cart) =>{
    //console.log ("cart=",cart);
    let cartSchema = new CartSchema(cart);
    return await cartSchema.save();
}

const getCartDirect = async (cartid)=>{
    let filter = {isDeleted:false,id:cartid,status:true};    
    // return await ProductSchema.findOne(filter).select(skipColumns).lean();
    // removing lean for now since it skips getters
    return await CartSchema.findOne({id:cartid}).select(skipColumns);
}

const updateCart = async (updatedObj)=>{
    let filter = {id:updatedObj.cartid};
    return await CartSchema.findOneAndUpdate(filter,updatedObj);
    
}

const isCartPresent = async (mobile)=>{
    let filter = {mobile:mobile};
    let cart = await CartSchema.findOne(filter).lean();
    console.log("hello : ",cart)
    return cart?true:false
}

const createUpdateCart = async (cart) =>{
    // check if code is present or not. if present throw Exception
    let filter = {mobile:cart.mobile};

    
    oldCart = await CartSchema.findOne(filter).lean();
    if(oldCart){
        //return await CartSchema.findByIdAndUpdate(filter,cart);
        return await CartSchema.findOneAndUpdate(filter,cart);
    }else{
        let cartSchema = new CartSchema(cart);
        return await cartSchema.save();
    }
    
}

const addItemToCart = async (mobile,cartItem)=>{

    return await CartSchema.updateOne(
        {mobile: mobile},
        {$push:{items:cartItem}}
    )

}

exports.createCart = createCart;
exports.updateCart = updateCart;
exports.createUpdateCart = createUpdateCart;
exports.deleteCart = deleteCart;
exports.getCartDirect = getCartDirect;
exports.getCartDetails = getCartDetails;
exports.isCartPresent = isCartPresent
exports.addItemToCart = addItemToCart
