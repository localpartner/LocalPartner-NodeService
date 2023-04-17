//const { Order, CartItem } = require('../models/order');
// sendgrid for email npm i @sendgrid/mail
//const { ObjectId } = require('mongodb');
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey('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');

const lodash = require("lodash");

const orderService = require('../services/orderService');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createOrder = async (req, res) => {
    const mobile = req.params.mobile;
    let attributes = ['name', 'billingAddress', , 'shippingAddress', 
                    'paymentDetails',  'products', 
                    'orderTotal', 'orderStatus', 'orderNotes'];
    let order = lodash.pick(req.body, attributes);
    order.mobile = mobile; 
    try {
        retObj = await orderService.createOrder(order);
        return res.status(200).json({
            status: true,
            message: "Order created successfully. Order Id:" + retObj.orderId
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

exports.getOrders = async (req, res) => {
    try {
        let mobile = req.params.mobile;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let order = await orderService.getOrders(mobile);
        if (!order) {
            retCode = 404;
            retStatus = false;
            retMessage = "Order does not exist";
        }
        else {
            retMessage = order;
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

exports.getOrderByID = async (req, res) => {
    try {
        let mobile = req.params.mobile;
        let orderId = req.params.orderId;
           
        retCode = 200;
        retStatus = true;
        retMessage = "";
        let order = await orderService.getOrderByID(mobile, orderId);
        if (!order) {
            retCode = 404;
            retStatus = false;
            retMessage = "Order does not exist";
        }
        else {
            retMessage = order;
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

exports.updateOrder = async (req, res) => {
    try{
        let attributes = ['name', 'billingAddress', , 'shippingAddress', 
                        'paymentDetails',  'products', 
                        'orderTotal', 'orderStatus', 'orderNotes', 'status'];
        let order = lodash.pick(req.body, attributes);
        mobile = req.params.mobile; 
        orderId = req.params.orderId;
        // console.log('mobile=', mobile);
        // console.log('orderId=', orderId);
        // console.log('order=', order);
        if(order.status===undefined)
            order.status = true;
        retCode = 200;
        retStatus = true;
        retMessage = "Order updated successfully";
        success = await orderService.updateOrder(mobile, orderId, order);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Order does not exist";
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

exports.deleteOrder = async (req, res) => {
    let mobile = req.params.mobile; 
    let orderId = req.params.orderId;
    try {
        retCode = 200;
        retStatus = true;
        retMessage = "Order deleted successfully";
        success = await orderService.deleteOrder(mobile, orderId);
        if (!success) {
            retCode = 404;
            retStatus = false;
            retMessage = "Order does not exist";
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

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.order);
};

exports.create = (req, res) => {
    console.log("I am in order create-----")
    req.body.order.user = req.params.userId;
    const order = new Order(req.body.order);
    console.log("data---", order, req.body.order)
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        // const emailData = {
        //     to: 'kaloraat@gmail.com',
        //     from: 'noreply@ecommerce.com',
        //     subject: `A new order is received`,
        //     html: `
        //     <p>Customer name:</p>
        //     <p>Total products: ${order.products.length}</p>
        //     <p>Total cost: ${order.amount}</p>
        //     <p>Login to dashboard to the order in detail.</p>
        // `
        // };
        // sgMail.send(emailData);
        res.json(data);
    });
};

exports.listOrders = async (req, res) => {
    /* try{
        const orders =  await Order.aggregate([
            {
                $lookup : {
                from : Category.collection.name,
                localField : "category",
                foreignField : "_id",
                as: "category"
                },
            }
        ]);
    }catch(e){
        console.log("error",e);
        return res.status(400).json({
            error: 'Orders not found'
        })
    } */

    const orderData = await Order.aggregate([
        {
            $match : {
                user: ObjectId(req.auth._id)
            }
         }//,
        
        // { 
        //     $lookup : {
        //         from : "products",
        //         localField : "products._id",
        //         foreignField : "_id",
        //         as: "productData"
        //     }
        // }
        
    ]);
    console.log("orderData---", orderData)
    return res.json(orderData);

    // Order.find({
    //     user: req.auth._id
    // })
    // .sort('-created')
    // .populate('user')
    // .exec((err, orders) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: errorHandler(error)
    //         });
    //     }
    //     res.json(orders);
    // });
};

exports.updateDelete = (req, res) => {
    const order = req.order;
    order.deletedAt = req.body.deletedAt;
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

/* Update order*/
/*
TODO : delete in future cleanup
exports.updateOrder = (req, res) => {
    const order = req.order;
    order.status = req.body.status;
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
*/
exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};
