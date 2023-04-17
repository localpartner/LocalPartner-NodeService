const lodash = require("lodash");

const FeaturedProductsListService = require('../services/featuredProductsListService');
const { errorHandler } = require('../helpers/dbErrorHandler');
const {getPagination } = require('../utils/pageUtils');

exports.updateFeaturedProductsList = async (req, res) => {
    try{
        let attributes = ['products'];
        let prodList = lodash.pick(req.body, attributes);
        await FeaturedProductsListService.createUpdateFeaturedProductsList(prodList);
            return res.status(200).json({
                status : true,
                message: "Featured/Special Products List updated successfully."
            })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": err.message,
            status: false
        });
    }
}

exports.getAllFeaturedSpecialProductsList= async (req, res) => {
    try {
            const {skip, limit} = getPagination (req.query);
            let prodList = await FeaturedProductsListService.getAllFeaturedSpecialProductsList(skip, limit); 
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

exports.getFeaturedProductsList= async (req, res) => {
    try {
            const {skip, limit} = getPagination (req.query);
            let listType = 'Featured';
            // listType = req.params.listType;
            // TODO: Add parameter validation
            //console.log('C:getFeaturedProductsList    listType=',listType);
            let prodList = await FeaturedProductsListService.getFeaturedProductsList(listType, skip, limit); 
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

exports.getSpecialProductsList= async (req, res) => {
    try {
            const {skip, limit} = getPagination (req.query);
            let listType = 'Special';
            //listType = req.params.listType;
            // TODO: Add parameter validation
            //console.log('C:getFeaturedProductsList    listType=',listType);
            let prodList = await FeaturedProductsListService.getFeaturedProductsList(listType, skip, limit); 
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


/*
exports.updateSpecialProductsList = async (req, res) => {
    try{
        let attributes = ['products'];
        let prodList = lodash.pick(req.body, attributes);
        let listType = 'Special';
        await FeaturedProductsListService.createUpdateFeaturedProductsList(listType, prodList);
            return res.status(200).json({
                status : true,
                message: "Special Products List updated successfully."
            })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": err.message,
            status: false
        });
    }
}

exports.getSpecialProductsList= async (req, res) => {
    try {
            const {skip, limit} = getPagination (req.query);
            let listType = 'Special';
            let prodList = await FeaturedProductsListService.getFeaturedProductsList(listType, skip, limit); 
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
*/
