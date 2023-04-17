const express = require("express");
const router = express.Router();
const multer = require("multer");
// var _config  = require("./config");
// var upload   = multer({ dest: _config.tempDir })


const ProductAPI = require("../controllers/product");
const FeaturedProductsListAPI = require("../controllers/featuredProductsList");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/customer");
const { productCreateValidator, productUpdateValidator } = require("../validator");
const AuthUtils =  require("../utils/authUtils");
const storage = multer.memoryStorage();

let upload = multer({ storage: storage}).any();

// router.get("/product/store/:storeid/list", ProductAPI.getAllProducts);
// add for all routes 

// for Admin
router.get("/prodmgmt/admin/product/list", ProductAPI.getAllProducts);
router.put("/prodmgmt/admin/product/:code/status", requireSignin, isAuth,AuthUtils.checkPermission('product'), ProductAPI.updateProduct);

router.get("/prodmgmt/store/:storeId/product/list", ProductAPI.getAllProducts);
router.get("/product/:code",ProductAPI.getProduct);
router.post("/prodmgmt/store/:storeId/product", requireSignin, isAuth,AuthUtils.checkPermission('product'), productCreateValidator, ProductAPI.createProduct);
router.delete("/product/:code", requireSignin, isAuth,AuthUtils.checkPermission('product'),ProductAPI.deleteProduct);
router.put( "/product/:code/", requireSignin, isAuth,AuthUtils.checkPermission('product'), productUpdateValidator, ProductAPI.updateProduct);
router.put( "/product/:code/status", requireSignin, isAuth,AuthUtils.checkPermission('product'), ProductAPI.updateProduct);

router.get("/fe/product/list", ProductAPI.getAllProductsPartial);
router.get("/fe/product/:code",ProductAPI.getProductPartial);

// same as fe product detail but filtered
router.get("/fe/product/featured/list", FeaturedProductsListAPI.getFeaturedProductsList);
router.get("/fe/product/special/list", FeaturedProductsListAPI.getSpecialProductsList);

router.put("/prodmgmt/admin/featured/product", FeaturedProductsListAPI.updateFeaturedProductsList);
router.get("/prodmgmt/admin/featured/product", FeaturedProductsListAPI.getAllFeaturedSpecialProductsList);
//router.put("/productlist/special", FeaturedProductsListAPI.updateSpecialProductsList);
//router.get("/productlist/special", FeaturedProductsListAPI.getSpecialProductsList);

/*router.get("/product/:productId", productDetailsById);

router.delete("/product/:productId/", remove );
router.put( "/product/:productId/", update);

router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.post("/product/status/:productId", updateStatus);
router.post("/product/statusChange/:productId", changeStatus);
router.post("/product/deletes/:productId", changeStatusDelete);

router.param("userId", userById);
router.param("productId", productById);*/

module.exports = router;
