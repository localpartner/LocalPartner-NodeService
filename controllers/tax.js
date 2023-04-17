const Tax = require('../models/product/tax');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.taxById = (req, res, next, id) => {
    Tax.findById(id)
    //.populate('tax')
    .exec((err, tax) => {
        if (err || !tax) {
            return res.status(400).json({
                error: 'Tax not found'
            });
        }
        req.tax = tax;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.tax);
};

exports.updateDelete = (req, res) => {
    const tax = req.tax;
    tax.deletedAt = req.body.deletedAt;
    tax.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.updateStatus = (req, res) => {
    const tax = req.tax;
    tax.status = req.body.taxStatus;
    tax.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.changeStatus = (req, res) => {
    const tax = req.tax;
    tax.status = req.body.taxStatus;
    tax.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
exports.remove = (req, res) => {
    let tax = req.tax;
    tax.remove((err, deletedTax) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Delete remove table'
        });
    });
};

/* Update Tax*/
exports.update = (req, res) => {
    const tax = req.tax;
    tax.taxName = req.body.taxName;
    tax.taxValue = req.body.taxValue;
    tax.taxDescription = req.body.taxDescription;
    tax.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

/* Insert into db table here  */
exports.create = (req, res) => {
   console.log(req.body)
   const tax = new Tax(req.body);
   tax.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({ data });
   });
};


exports.list = (req, res) => {
        
    let order = req.query.order ? req.query.order : 'asc';
   //let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    
    Tax.find()
        .sort([[order]])
        .exec((err, tax) => {
            if (err) {
                return res.status(400).json({
                    error: 'Tax not found'
                });
            }
            res.json(tax);
     
        });
};







