const express = require('express');
const router = express.Router();

const proveedorCtrl = require("../controllers/proveedor.controller.js");
const auth = require('../middleware/authjwt');

router.post     ("/",         auth.verifyToken, proveedorCtrl.create);
router.get      ("/",         proveedorCtrl.findAll);
router.get      ("/:id",      proveedorCtrl.findOne);
router.put      ("/:id",      auth.verifyToken,proveedorCtrl.update);
router.delete   ("/:id",      auth.verifyToken,proveedorCtrl.delete);


module.exports = router;