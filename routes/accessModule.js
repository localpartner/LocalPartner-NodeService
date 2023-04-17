const express = require("express");
const router = express.Router();

const { accessModule } = require("../controllers/accessModule");
router.get("/accessModuleList" , accessModule); 

module.exports = router;