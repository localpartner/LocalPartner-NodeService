const path = require('path');
const fs = require('fs');
const lodash = require("lodash");

const ProductService = require('../services/productService');
const { errorHandler } = require('../helpers/dbErrorHandler');
const {getPagination } = require('../utils/pageUtils');
const productValidator = require("./../validator/productAttributeValidators")

exports.createProduct = async (req, res) => {
    try{
        let attributes = ['name','code', 'description','tags','price','location','isRental',
                            "identification","stock","status", "highlights", "features",
                            "links","specifications","options","discount","specials","images"];
        let product = lodash.pick(req.body, attributes);
        let storeId = req.params.storeId;
        product.storeId = storeId;
        await ProductService.createProduct(product);
            return res.status(200).json({
                status : true,
                message: "Product created successfully."
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

exports.updateProduct = async (req, res) => {
    try{
        let attributes = ['name','description','tags','price','location','isRental',
                            "identification","stock", "highlights", "features",
                            "links","specifications","options","discount","specials","images", "status"];
        let product = lodash.pick(req.body, attributes);
        //console.log(product);
        product.code = req.params.code;
        if(product.status===undefined)
            delete product.status;
        retCode = 200;
        retStatus = true;
        retMessage = "Product updated successfully";
        success = await ProductService.updateProduct(product.code, product);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Product does not exist";
        }
        return res.status(retCode).json({
            status: retStatus,
            message: retMessage
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": err.message,
            status: false
        });
    }
}

exports.getAllProducts= async (req, res) => {
    //TODO: the result returns mongodb object ids of sub schemas, suppress the ids
    try {
            const {skip, limit} = getPagination (req.query);

            // take storeid from req.params
            let storeId = req.params.storeId;
            // filter product list by store id 

            let fetchType = req.query.fetch;
            let flag = false;
            if (fetchType && fetchType === 'all') {
                flag = true;
            }
            let queryParams = lodash.pick(req.query, ['storeId', 'name', 'code']);
            
            let sortOrder = req.query.order ? req.query.order : 'asc';
            let sortBy = req.query.sortBy ? req.query.sortBy : 'name';
            let obj = {}
            obj[sortBy] = sortOrder;

            let prodList = await ProductService.getAllProducts(storeId, flag, obj, skip, limit,queryParams); 
            prodList = prodList.map((product)=>{
                if(product.storeId && product.storeId !=null){
                    let storeName = product.storeId.storeName
                    let mProduct = {...product.toObject(),...{storeName:storeName}}
                    //product['storeName'] = storeName
                    //console.log("name : ",storeName)
                    delete mProduct.storeId
                    return mProduct
                }
               
                return product;
            })                 
            return res.status(200).json({
                status: true,
                result: prodList
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

exports.getAllProductsPartial= async (req, res) => {
    //TODO: the result returns mongodb object ids of sub schemas, suppress the ids
    try {
            const {skip, limit} = getPagination (req.query);

            let fetchType = req.query.fetch;
            let flag = false;
            if (fetchType && fetchType === 'all') {
                flag = true;
            }
            // force flag to false so that only status=true products are returned to frontend.
            flag = false;
            let sortOrder = req.query.order ? req.query.order : 'asc';
            let sortBy = req.query.sortBy ? req.query.sortBy : 'name';
            let obj = {}
            obj[sortBy] = sortOrder;
            let queryParams = lodash.pick(req.query, ['category', 'name']);

            let prodList = await ProductService.getAllProductsPartial(flag, obj, skip, limit,queryParams); 
            prodList = prodList.map((product)=>{
                if(product.storeId && product.storeId !=null){
                    let storeName = product.storeId.storeName
                    let mProduct = {...product.toObject(),...{storeName:storeName}}
                    //product['storeName'] = storeName
                    //console.log("name : ",storeName)
                    delete mProduct.storeId
                    return mProduct
                }
               
                return product;
            })           
            return res.status(200).json({
                status: true,
                result: prodList
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

exports.getProductPartial = async (req,res) => {
    try {
        let code = req.params.code;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let prod = await ProductService.getProductPartial(code);
        if (!prod) {
            retCode = 404;
            retStatus = false;
            retMessage = "Product does not exist";
        }
        else {
            retMessage = prod;
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
 }


exports.getProduct = async (req, res) => {
    try {
        let code = req.params.code;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let prod = await ProductService.getActiveProduct(code);
        if (!prod) {
            retCode = 404;
            retStatus = false;
            retMessage = "Product does not exist";
        }
        else {
            retMessage = prod;
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
/*
//TODO: this method is probably not needed? or else getProductDetails is not needed.
exports.getProductPartial = async (req, res) => {
    try {
        let code = req.params.code;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let prod = await ProductService.getProductPartial(code)
        if (!prod) {
            retCode = 404;
            retStatus = false;
            retMessage = "Product does not exist";
        }
        else {
            retMessage = prod;
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
*/

exports.deleteProduct = async (req, res) => {
    let code = req.params.code;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Product deleted successfully";

        success = await ProductService.deleteProduct(code);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Product does not exist";
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

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};
*/

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.update = (req, res) => {
    const product = req.product;
    product.name = req.body.name;
    product.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
         res.json(data);
    });
};
*/

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    Product.find()
        // .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};
*/
/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};
*/
/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);
    });
};
*/
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
*/
/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};
*/
/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo');
    }
};
*/
/* 
TODO: future dead code. method will not be used after order refactor. to be removed in future code cleanup
*/
exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item.id },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next();
    });
};

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.updateStatus = (req, res) => {
    let product = req.product;
    product.status = req.body.statusVlaue;
    product.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
*/
/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.changeStatus = (req, res) => {
    const products = req.product;
    products.status = req.body.statusVlaue;
    products.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
*/
/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.changeStatusDelete = (req, res) => {
    const products = req.product;
    products.deletedAt = req.body.statusVlaue;
    products.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
                
            });
        }
        res.json(data);
    });
};
*/

