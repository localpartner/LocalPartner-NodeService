const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
//const { userById, addOrderToUserHistory } = require("../controllers/customer");
//const { decreaseQuantity } = require("../controllers/product");
const { createOrder, getOrders, getOrderByID, updateOrder, deleteOrder } = require("../controllers/order");

//router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create );
//router.get("/order/list/:userId", requireSignin, isAuth, listOrders);
//router.get("/order/status-values/:userId", requireSignin,isAuth,getStatusValues);
//router.put("/order/:orderId/status/:userId", requireSignin, isAuth, updateOrderStatus);

//router.get("/order/list/", listOrders);
//router.param("orderId", orderById);
//router.get('/order/:orderId', read);
//router.put("/order/update/:orderId", updateOrder);
//router.post("/order/delete/:orderId", updateDelete);


router.post("/ordermgmt/:mobile/order", requireSignin, isAuth, /*addOrderToUserHistory, decreaseQuantity,*/ createOrder );
router.get("/ordermgmt/:mobile/order/list", requireSignin, isAuth, /*addOrderToUserHistory, decreaseQuantity,*/ getOrders );
router.get("/ordermgmt/:mobile/order/:orderId", requireSignin, isAuth, /*addOrderToUserHistory, decreaseQuantity,*/ getOrderByID );
router.put("/ordermgmt/:mobile/order/:orderId", requireSignin, isAuth, /*addOrderToUserHistory, decreaseQuantity,*/ updateOrder );
router.put("/ordermgmt/:mobile/order/:orderId/status", requireSignin, isAuth, /*addOrderToUserHistory, decreaseQuantity,*/ updateOrder );
router.delete("/ordermgmt/:mobile/order/:orderId", requireSignin, isAuth, /*addOrderToUserHistory, decreaseQuantity,*/ deleteOrder );

module.exports = router;
