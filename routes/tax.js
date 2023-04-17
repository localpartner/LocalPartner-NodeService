const express = require("express");
const router = express.Router();

const { read,create,taxById,list,update,updateStatus ,changeStatus ,remove,updateDelete} = require('../controllers/tax');
const { taxValidator } = require("../validator");

router.get('/tax/:taxId', read);
router.post('/tax/create', create);
router.get('/tax', list);
router.post("/tax/status/:taxId", updateStatus);
router.post("/tax/statusChange/:taxId", changeStatus);
router.put("/tax/:taxId", taxValidator, update);
router.delete("/tax/:taxId", remove);
router.post("/tax/delete/:taxId", updateDelete);
router.param('taxId', taxById);

module.exports = router;
