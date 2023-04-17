//const path = require('path');
//const fs = require('fs');

const lodash = require("lodash");

const manufacturerService = require('../services/manufacturerService');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createManufacturer = async (req, res) => {
    let manufacturer = lodash.pick(req.body, ['name', 'description', 'img']);
    /*
    TODO: dead code to be removed in future cleanup
        if (req.files.length > 0) {
        let originalfilename = req.files[0].originalname;
        var img = fs.readFileSync(`uploads/${req.files[0].filename}`);
        var encode_img = Buffer.from(img.toString('base64'),'base64');
        //console.log (encode_img);
        var finalImg = {
            name: originalfilename,
            img: {
                contentType:req.files[0].mimetype,
                data: encode_img
            }
        };
        manufacturer.image = finalImg;
    }
    */
    try {
        await manufacturerService.createManufacturer(manufacturer)
        return res.status(200).json({
            status: true,
            message: "Manufacturer created successfully."
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    }
    /* dead code to be removed in future code cleanup
    finally {
        if (req.files.length > 0) {
            fs.unlinkSync(`uploads/${req.files[0].filename}`);
        }
    }
    */
};

exports.getManufacturer = async (req, res) => {
    try {
        let manufacturerName = req.params.manufacturerName;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let manufacturer = await manufacturerService.getManufacturer(manufacturerName);
        if (!manufacturer) {
            retCode = 404;
            retStatus = false;
            retMessage = "Manufacturer does not exist";
        }
        else {
            retMessage = manufacturer;
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

exports.getAllManufacturers = async (req, res) => {
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

            let manufacturerList = await manufacturerService.getAllManufacturers(flag, obj);
            return res.status(200).json({
                status: true,
                result: manufacturerList
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

exports.updateManufacturer = async (req, res) => {
    let manufacturer = lodash.pick(req.body, ['description', 'status', 'img']);
    manufacturer.name = req.params.manufacturerName;
    /*
    TODO: dead code to be removed in future cleanup
    if (req.files.length > 0) {
       let originalfilename = req.files[0].originalname;
       var img = fs.readFileSync(`uploads/${req.files[0].filename}`);
       var encode_img = Buffer.from(img.toString('base64'),'base64');
       //console.log (encode_img);
       var final_img = {
           name: originalfilename,
           img: {
               contentType:req.files[0].mimetype,
               data: encode_img
           }
       };
       manufacturer.image = final_img;
    }
    //console.log(manufacturer)
    */
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Manufacturer updated successfully";
        success = await manufacturerService.updateManufacturer (manufacturer.name, manufacturer);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Manufacturer does not exist";
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
    /* dead code to be removed in future code cleanup
    finally {
        if (req.files.length > 0) {
            fs.unlinkSync(`uploads/${req.files[0].filename}`);
        }
    }
    */
};

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.setManufacturerImage = async (req, res) => {
    let originalfilename = req.files[0].originalname;
    let manufacturer = lodash.pick(req.body, ['name','description']);
    //console.log(manufacturer)
    var img = fs.readFileSync(`uploads/${req.files[0].filename}`);
    var encode_img = Buffer.from(img.toString('base64'),'base64');
    //console.log (encode_img);
    var final_img = {
        name: originalfilename,
        img: {
            contentType:req.files[0].mimetype,
            data: encode_img
        }
    };
    /*let manufacturer = {
        name: manufacturerName,
        image: final_img 
    }*/ /*
    manufacturer.image = final_img;
    console.log (manufacturer);

    try {
        await manufacturerService.updateManufacturer (manufacturer.name, manufacturer);
        return res.status(200).json({
            status: true,
            message: "Manufacturer updated successfully"
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: "Something went wrong.",
            "message": e.message,
            status: false
        });
    } finally {
        fs.unlinkSync(`uploads/${req.files[0].filename}`);
    }
};
*/

exports.deleteManufacturer = async (req, res) => {
    let manufacturerName = req.params.manufacturerName;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Manufacturer deleted successfully";
        success = await manufacturerService.deleteManufacturer(manufacturerName);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Manufacturer does not exist";
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
exports.manufacturerById = (req, res, next, id) => {
    Manufacturer.findById(id)
        .exec((err, manufacturer) => {
            if (err || !manufacturer) {
                return res.status(400).json({
                    error: 'Manufacturer not found'
                });
            }
            req.manufacturer = manufacturer;
            next();
        });
};
*/

/* insert into db table   */ 
/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.create = (req, res) => {
    console.log(req.body)
    const manufacturer = new Manufacturer(req.body);
    console.log(manufacturer);
    manufacturer.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};
*/

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.read = (req, res) => {
    return res.json(req.manufacturer);
};
*/

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.update = (req, res) => {
    const manufacturer = req.manufacturer;
    manufacturer.manufacturerName = req.body.manufacturerName;
    manufacturer.description = req.body.description;
    manufacturer.save((err, data) => {
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
exports.updateDelete = (req, res) => {
    const manufacturer = req.manufacturer;
    manufacturer.deletedAt = req.body.manufacturerName;
    manufacturer.save((err, data) => {
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
exports.updateStatus = (req, res) => {
    console.log(req.body)
    const manufacturer = req.manufacturer;
    console.log(manufacturer);
    manufacturer.status = req.body.manufacturerName;
    manufacturer.save((err, data) => {
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
    const manufacturer = req.manufacturer;
    manufacturer.status = req.body.manufacturerName;
    manufacturer.save((err, data) => {
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
exports.remove = (req, res) => {
    let manufacturer = req.manufacturer;
    manufacturer.remove((err, deletedManf) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Delet Manufacture table'
        });
    });
};
*/

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.list = (req, res) => {
        
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    
    Manufacturer.find()
        .sort([[sortBy, order]])
        .exec((err, manufacturer) => {
            if (err) {
                return res.status(400).json({
                    error: 'Manufacturer not found'
                });
            }
            res.json(manufacturer);
     
        });
};
*/