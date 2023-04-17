const SpecificationService = require('../services/specificationService');
const lodash = require("lodash");

exports.createSpecification = async (req, res) => {
    let specification = lodash.pick(req.body, ['name', 'code', 'description','specificationGroup','type','attributeCode']);
    try {

        await SpecificationService.createSpecification(specification);
        return res.status(200).json({
            status: true,
            message: "Specification created successfully"
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

exports.updateSpecification = async (req, res) => {
    let specification = lodash.pick(req.body, ['name', 'description','specificationGroup','type','attributeCode',"status"]);
    let code = req.params.code;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Specification updated successfully";

        success = await SpecificationService.updateSpecification(code,specification);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Specification does not exist";
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

exports.deleteSpecification = async (req, res) => {
    let code = req.params.code;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Specification deleted successfully";
        success = await SpecificationService.deleteSpecification(code)
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Specification does not exist";
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
exports.getSpecification = async (req, res) => {
    try {
        let code = req.params.code;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let spec = await SpecificationService.getSpecification(code)
        if (!spec) {
            retCode = 404;
            retStatus = false;
            retMessage = "Specification does not exist";
        }
        else {
            retMessage = spec;
        }
        return res.status(retCode).json({
            status: retStatus,
            result: retMessage
        });
    } catch (e) {
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
};

exports.getAllSpecifications= async (req, res) => {

    try {
            let fetchType = req.query.fetch;
            let flag = false;
            if (fetchType && fetchType === 'all') {
                flag = true;
            }
            let sortOrder = req.query.order ? req.query.order : 'asc';
            let sortBy = req.query.sortBy ? req.query.sortBy : 'name';
            let obj = {}
            obj[sortBy] = sortOrder;

            let specList = await SpecificationService.getAllSpecifications(flag, obj);            
            return res.status(200).json({
                status: true,
                result: specList
            });
    } catch (e) {
        return res.status(500).json({
            error: "Something went wrong.",
            status: false
        });
    }
};

exports.getAllSpecificationGroups= async (req, res) => {

    try {
            let specGrpList = await SpecificationService.getAllSpecificationGroups();           
            return res.status(200).json({
                status: true,
                result: specGrpList
            });
    } catch (e) {
        return res.status(500).json({
            error: "Something went wrong.",
            status: false
        });
    }
};
