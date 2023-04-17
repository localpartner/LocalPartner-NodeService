const User = require('../models/customer/customer');
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Customer = require("../models/customer/customer");


exports.userById = (req, res, next, id) => {
    Customer.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.userByMobile = (req, res, next,mobile) => {
    Customer.findOne({"mobile":mobile}).lean().exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// exports.update = (req, res) => {
//     console.log('user update', req.body);
//     req.body.role = 0; // role will always be 0
//     User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'You are not authorized to perform this action'
//             });
//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json(user);
//     });
// };

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    console.log("req.body", req)
    Customer.findByIdAndUpdate( req.profile._id , req.body, (err, user) => {
        console.log(user)
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        return res.json(user);
    });
};

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];
    req.body.order.products.forEach(item => {
        history.push({
            _id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });
    // console.log("req.body",req.body.user)

    const addressUpdate = {
        email : req.body.order.user.email,
        address : req.body.order.user.address,
        country : req.body.order.user.country,
        city : req.body.order.user.city,
        state : req.body.order.user.state,
        pincode : req.body.order.user.pinCode,
    }

    Customer.findOneAndUpdate({ _id: req.params.userId }, {$set: addressUpdate , $push: { history: history }  }, { new: true ,upsert:true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    console.log("req---",req)
    Order.find({ user: req.params.userId })
        // .populate('user', '_id')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

exports.list = (req, res) => {
        
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    User.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, customer) => {
            if (err) {
                return res.status(400).json({
                    error: 'customer not found'
                });
            }
            res.json(customer);
        });
};

exports.reads = (req, res) => {
    return res.json(req.User);
};