
const lodash = require("lodash");

const customerService = require('../services/customerService');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createCustomer = async (req, res) => {
    let customer = lodash.pick(req.body, ['firstname', 'lastname','mobile', 'email', 
                                            'gender', 'img', 'about', 'addresses']);
    try {
        await customerService.createCustomer(customer);
        return res.status(200).json({
            status: true,
            message: "Customer created successfully."
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

exports.getCustomer = async (req, res) => {
    try {
        let customerMobile = req.params.mobile;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let customer = await customerService.getCustomer(customerMobile);
        if (!customer) {
            retCode = 404;
            retStatus = false;
            retMessage = "Customer does not exist";
        }
        else {
            retMessage = customer;
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

exports.getAllCustomers = async (req, res) => {
    try {
            console.log(req.query);
            let fetchType = req.query.fetch;
            let flag = false;
            if (fetchType && fetchType === 'all') {
                flag = true;
            }
            let sortOrder = req.query.order ? req.query.order : 'asc';
            let sortBy = req.query.sortBy ? req.query.sortBy : 'lastname';
            let obj = {}
            obj[sortBy] = sortOrder;

            console.log(flag);
            console.log(obj);
            let customerList = await customerService.getAllCustomers(flag, obj);
            return res.status(200).json({
                status: true,
                result: customerList
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

exports.updateCustomer = async (req, res) => {
    let customer = lodash.pick(req.body, ['firstname', 'lastname', 'email', 
                                            'gender', 'img', 'about', 'addresses', 'status']);
    customer.mobile = req.params.mobile;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Customer updated successfully";
        success = await customerService.updateCustomer (customer.mobile, customer);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Customer does not exist";
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

exports.deleteCustomer = async (req, res) => {
    let customerMobile = req.params.mobile;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Customer deleted successfully";
        success = await customerService.deleteCustomer(customerMobile);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Customer does not exist";
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
exports.productById = (req, res, next, id) => {
    Customer.findById(id)
       .exec((err, customer) => {
           if (err || !customer) {
               return res.status(400).json({
                   error: 'customer not found'
               });
           }
           req.customer = customer;
           next();
       });

};
*/

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.create = (req, res) => {
   //console.log(req.body)
   const customer = new Customer(req.body);
   customer.save((err, data) => {
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
   return res.json(req.customer);
};
*/

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.update = (req, res) => {

   const customer = req.customer;
   customer.name = req.body.name;
   customer.email = req.body.email;
   customer.save((err, data) => {
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

   const customer = req.customer;
   customer.deletedAt = req.body.name;
   customer.save((err, data) => {
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

    const customer = req.customer;
    customer.status = req.body.statusV;
    customer.save((err, data) => {
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
 exports.updateStatusCheck = (req, res) => {

    const customer = req.customer;
    customer.status = req.body.status;
    customer.save((err, data) => {
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
   let customer = req.customer;
   customer.remove((err, deletedManf) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({
           message: 'Delet customer table'
       });
   });
};
*/

/* 
TODO: dead code. method not used. to be removed in future code cleanup
exports.list = (req, res) => {
       
   let order = req.query.order ? req.query.order : 'asc';
   let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
   Customer.find()
       .sort([[sortBy, order]])
       .exec((err, customer) => {
           console.log(err)
           if (err) {
               return res.status(400).json({
                   error: 'customer not found'
               });
           }
           res.json(customer);
       });
};
*/