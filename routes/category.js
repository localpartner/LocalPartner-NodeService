const express = require('express');
const router = express.Router();

const { createCategory,getCategories,getCategory,deleteCategory,updateCategory  } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/customer');
const { categoryValidator,categoryUpdateValidator } = require("../validator");
const AuthUtils =  require("../utils/authUtils");

//router.get('/category/:categoryId', read);

router.get('/category/list', getCategories);
router.post("/category",categoryValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'),createCategory);
router.post("/category/:category/subcategory",categoryValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'),createCategory);
router.get("/category/:categoryCode",getCategory);
router.get("/category/:parentCategoryCode/subcategory/:categoryCode",getCategory);
router.delete("/category/:categoryCode",requireSignin, isAuth,AuthUtils.checkPermission('product'),deleteCategory);
router.delete("/category/:parentCategoryCode/subcategory/:categoryCode",requireSignin, isAuth,AuthUtils.checkPermission('product'),deleteCategory);
router.put("/category/:categoryCode",categoryUpdateValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'),updateCategory);
router.put("/category/:parentCategoryCode/subcategory/:categoryCode",categoryUpdateValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'),updateCategory);
router.put("/category/:categoryCode/status",requireSignin, isAuth,AuthUtils.checkPermission('product'),updateCategory);
router.put("/category/:parentCategoryCode/subcategory/:categoryCode/status",requireSignin, isAuth,AuthUtils.checkPermission('product'),updateCategory);

// router.get('/subcategory/:categoryId', subcategory);

// router.post('/category/create',categoryValidator, create);

// router.delete("/category/:categoryId", remove);

// router.delete("/categorys/:categoryId", remove1);

// router.post("/categorys/delete/:categoryId", updateDelete);

// router.post("/category/status/:categoryId", updateStatus);

// router.post("/category/statusChange/:categoryId", changeStatus);

// router.put('/category/:categoryId',categoryValidator, update);

// router.get('/categories', list);

// router.param('categoryId', categoryById);

// router.param('userId', userById);

module.exports = router;
