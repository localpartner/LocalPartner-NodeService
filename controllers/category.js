const { uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { ref } = require("@firebase/storage");

const firebase = require("./dbFirebase");
const firestore = firebase.firestore();
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

var path = require("path");
const fs = require("fs");
const lodash = require("lodash");


const Category = require('../models/category/category');
const Product = require('../models/product/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const CategoryService  = require("../services/categoryService")

exports.uploadImg = async (req, res) => {
    console.log("testing", req.file);
    const file = req.file;
    const timestamp = Date.now();
    const name = file.originalname.split(".")[0];
    const type = file.originalname.split(".")[1];
    const fileName = `${name}_${timestamp}.${type}`;
    console.log("fileName : ", fileName);
    // Step 1. Create reference for file name in cloud storage
    const imageRef = storage.child(`/slider/${fileName}`);
    // Step 2. Upload the file in the bucket storage
    const snapshot = await imageRef.put(file.buffer);
    // Step 3. Grab the public url
    const downloadURL = await snapshot.ref.getDownloadURL();
  };
  
exports.getCategories = async (req, res) => {
    try {
            let fetchType = req.query.fetch;
            let flag = false;
            if (fetchType && fetchType === 'all') {
                flag = true;
            }
            let categoryList = await CategoryService.getAllCategories(flag);
            return res.status(200).json({
                status: true,
                result: categoryList,
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

exports.createCategory = async (req, res) => {
    let category = lodash.pick(req.body, ['name', 'code','description', 'subcategories']);
    let parentCategory = req.params.category;

    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Category created successfully";
            
        let obj = await CategoryService.createCategory(category,parentCategory);
        if (!obj) {
            retCode = 404;
            retStatus = false;
            retMessage = "Category does not exist";
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
exports.updateCategory = async (req, res) => {
    let category = lodash.pick(req.body, ['name', 'description',"status"]);
    let parentCategory = req.params.parentCategoryCode;
    let categoryCode = req.params.categoryCode;
    if(category.status===undefined)
        delete category.status;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Category updated successfully";
        success = await CategoryService.updateCategory(categoryCode,parentCategory,category);
        //console.log('success');
        //console.log(success);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Category does not exist";
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
exports.getCategory = async (req, res) => {
    try {
        let parentCategory = req.params.parentCategoryCode;
        let categoryCode = req.params.categoryCode;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let category = await CategoryService.getCategory(categoryCode,parentCategory);
        //console.log (' outer category');
        //console.log (category);
        if (!category) {
            retCode = 404;
            retStatus = false;
            retMessage = "Category does not exist";
        }
        else {
            retMessage = category;
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
exports.deleteCategory = async (req, res) => {
    try {
        let parentCategory = req.params.parentCategoryCode;
        let categoryCode = req.params.categoryCode;
        //console.log (req.params.parentCategoryCode, req.params.categoryCode);
           
        retCode = 200;
        retStatus = true;
        retMessage = "Category deleted successfully";
        success = await CategoryService.deleteCategory(categoryCode,parentCategory);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Category does not exist";
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
/*
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
};

exports.create = (req, res) => {
    console.log(req.body)
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    Category.find({
        status: 1
    }).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
    //return res.json(req.category);
    
};

exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.description = req.body.description;
    category.navigation = req.body.navigation;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
exports.remove1 = (req, res) => {
    const categoryId = req.params.categoryId;
    const subcategory = req.subcategory;
    //subcategory.subcategory = req.Category;

   // console.log(Category,"pppppp,,,,,,")
    Category.findByIdAndDelete(categoryId, subcategory, function(err, data){
        if (err){
            console.log(err)
        }
        else{
            res.json({
                message: 'Category deleted...'
            });
        }
    })
};
exports.remove = (req, res) => {
    const categoryId = req.params.categoryId;
    Category.findByIdAndDelete(categoryId, function(err, data){
        if (err){
            console.log(err)
        }
        else{
            res.json({
                message: 'Category deleted'
            });
        }
    })
};

exports.updateStatus = (req, res) => {
    const category = req.category;
    category.status = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.updateDelete = (req, res) => {
    const category = req.category;
    category.deletedAt = req.body.manufacturerName;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.changeStatus = (req, res) => {
    const category = req.category;
    category.status = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.list = (req, res) => {
    Category.find({
        status: 1
    }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.subcategory = (req, res) => {
    Category.find({
        status: 1
    }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
*/