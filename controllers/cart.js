const path = require('path');
const fs = require('fs');
const lodash = require("lodash");

const CartService = require('../services/cartService');

const productValidator = require("./../validator/productAttributeValidators")


exports.createFECart = async (req, res) => {
    try{
        //console.log (req.body);
        //let attributes = ['productCode','optionName','optionValue','units'];
        let cartdata = lodash.pick(req.body, ['mobile','items']);
        //console.log("cartdata=", cartdata);
        //let cartItems = req.body.items.map((item)=>{
        //    return lodash.pick(item, attributes);
        //})

        //let obj = {mobileNum, items:cartItems}
        //console.log("obj=", obj);
        retObj = await CartService.createCart(cartdata);
            return res.status(200).json({
                status : true,
                //message: "Cart Saved successfully."
                message: {"cartId": retObj.id}
            })
    
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": err.message,
            status: false
        });
    }
}

exports.updateFECart = async (req, res) => {
    try{
        //let attributes = ['productCode','optionName','optionValue','units'];
        let cartdata = lodash.pick(req.body, ['mobile', 'status','items']);
        cartdata.cartid = req.params.cartid;
        //console.log("cartdata=", cartdata);
        retCode = 200;
        retStatus = true;
        retMessage = "Cart updated successfully";
        success = await CartService.updateCart (cartdata);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Cart does not exist";
        }
        return res.status(retCode).json({
            status: retStatus,
            message: retMessage
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    } 
}
exports.addItemToCart = async(req,res)=>{
    try{
            let attributes = ['productCode','options','units'];
            const mobile = Number(req.params.mobile);
            let cart = req.body;
            let cartItem = lodash.pick(cart, attributes);
            let retObj;

            let isCartPresent = await CartService.isCartPresent(mobile)
            
            if(!isCartPresent){
                // create cart
                let obj = {mobile: mobile, items:[cartItem]}
            
                retObj = await CartService.createUpdateCart(obj);
                //console.log ("retObj=",retObj);
                return res.status(200).json({
                    status : true,
                    //message: "Cart Saved successfully."
                    message: {"cartId": retObj.id}
                })
            }else{

                retObj = await CartService.addItemToCart(mobile,cartItem);
                return res.status(200).json({
                    status : true,
                    //message: "Cart Saved successfully."
                    message: {"cartId": retObj.id}
                })

            }
        }catch(err){
            console.log(err);
            return res.status(500).json({
            error: "Something went wrong.",
            "message": err.message,
            status: false
        });
    }
        

        
}
exports.createUpdateCart = async (req, res) => {
    try{
        let attributes = ['productCode','options','units'];
        const mobile = Number(req.params.mobile);
        let cart = req.body;
        let cartItems = cart.items.map((item)=>{
            return lodash.pick(item, attributes);
        })

        let obj = {mobile: mobile, items:cartItems}
        
        retObj = await CartService.createUpdateCart(obj);
        console.log ("retObj=",retObj);
            return res.status(200).json({
                status : true,
                //message: "Cart Saved successfully."
                message: {"cartId": retObj.id}
            })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": err.message,
            status: false
        });
    }
}

exports.deleteCart = async (req, res) => {
    try{
        
        const mobile = req.params.mobile;
        await CartService.deleteCart(mobile);
        return res.status(200).json({
            status : true,
            message: "Cart Deleted successfully."
        })
    
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": err.message,
            status: false
        });
    }
}

exports.deleteFECart = async (req, res) => {
    let cartid = req.params.cartid;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Cart deleted successfully";
        success = await CartService.deleteCart(cartid);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Cart does not exist";
        }
        return res.status(retCode).json({
            status: retStatus,
            message: retMessage
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
};

exports.getFECartDetails= async (req, res) => {
    try {
        //console.log("req.params=", req.params);
        let cartId = req.params.cartid;
        //console.log ("cartId=",cartId);
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let cart = await CartService.getCartDirect();            
        if (!cart) {
            retCode = 404;
            retStatus = false;
            retMessage = "Cart does not exist";
        }
        else {
            retMessage = cart;
        }
        return res.status(retCode).json({
            status: retStatus,
            result: retMessage
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
};

exports.getCartDetails= async (req, res) => {
    try {
        //console.log("C:getCartDetails   req.params=", req.params);
        let mobileNum = Number(req.params.mobile);
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let cart = await CartService.getCartDetails(mobileNum);            
        if (!cart) {
            retCode = 404;
            retStatus = false;
            retMessage = "Cart does not exist";
        }
        else {
            retMessage = cart;
        }
        return res.status(retCode).json({
            status: retStatus,
            result: retMessage
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
};

