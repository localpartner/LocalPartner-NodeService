const express = require("express");
const router = express.Router();
const { createCustomer, 
        getCustomer, 
        getAllCustomers,
        updateCustomer,
        deleteCustomer } = require('../controllers/cust');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
//const { custValidator } = require("../validator");

router.post('/cust', requireSignin, isAuth, createCustomer);
router.get('/cust/list', requireSignin, isAuth, getAllCustomers);
router.get('/cust/:mobile', requireSignin, isAuth, getCustomer);
router.put('/cust/:mobile', requireSignin, isAuth, updateCustomer);
router.delete('/cust/:mobile', requireSignin, isAuth, deleteCustomer);
router.put('/cust/:mobile/status', requireSignin, isAuth, updateCustomer);

//router.get('/cust/:productId', read);
//router.get('/cust', list);
//router.put("/cust/:productId", update);
//router.delete("/cust/:productId", remove);

//router.post("/cust/delete/:productId", updateDelete);
//router.post("/cust/status/:productId", updateStatus);
//router.post("/cust/statusCheck/:productId", updateStatusCheck);



//router.param('productId', productById);

module.exports = router;
