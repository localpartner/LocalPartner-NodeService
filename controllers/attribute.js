const AttributeService = require('../services/attributeService');
const { errorHandler } = require('../helpers/dbErrorHandler');
const lodash = require("lodash");
/*exports.attributeById = (req, res, next, id) => {
    Attribute.findById(id)
        //.populate('attribute')
        .exec((err, attribute) => {
            if (err || !attribute) {
                return res.status(400).json({
                    error: 'Attribute not found'
                });
            }
            req.attribute = attribute;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.attribute);
};

exports.updateDelete = (req, res) => {

    const attribute = req.attribute;
    attribute.deletedAt = req.body.attributeName;
    attribute.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.updateStatus = (req, res) => {
    const attribute = req.attribute;
    attribute.status = req.body.attributeName;
    attribute.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.changeStatus = (req, res) => {
    const attribute = req.attribute;
    attribute.status = req.body.attributeName;
    attribute.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
exports.remove = (req, res) => {
    let attribute = req.attribute;
    attribute.remove((err, deletedAttribute) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Delet remove table'
        });
    });
};

exports.update = (req, res) => {

    const attribute = req.attribute;
    attribute.attributeName = req.body.attributeName;
    attribute.description = req.body.description;
    attribute.dimension = req.body.dimension;
    attribute.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

*/
exports.createAttribute = async (req, res) => {

    let attribute = lodash.pick(req.body, ['name', 'value', 'description']);
    try {

        await AttributeService.createAttribute(attribute)
        return res.status(200).json({
            status: true,
            message: "Attribute created successfully"
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }

};

exports.updateAttribute = async (req, res) => {

    let attribute = lodash.pick(req.body, ['value', 'description',"status"]);
    let attributeName = req.params.attributeName;
    try {

        await AttributeService.updateAttribute(attributeName,attribute);
        return res.status(200).json({
            status: true,
            message: "Attribute updated successfully"
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
};

exports.deleteAttribute = async (req, res) => {

   
    let attributeName = req.params.attributeName;
    try {

        await AttributeService.deleteAttribute(attributeName);
        return res.status(200).json({
            status: true,
            message: "Attribute deleted successfully"
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
};
exports.getAttribute = async (req, res) => {
    try {
        let attributeName = req.params.attributeName;
           
            let attribute = await AttributeService.getAttribute(attributeName)
            return res.status(200).json({
                status: true,
                result: attribute
            });
    } catch (e) {
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
};

exports.getAllAttributes = async (req, res) => {

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

            let attributeList = await AttributeService.getAllAttributes(flag, obj);
            console.log(attributeList)
            return res.status(200).json({
                status: true,
                result: attributeList
            });
    } catch (e) {
        return res.status(500).json({
            error: "Something went wrong.",
            status: false
        });
    }
};
