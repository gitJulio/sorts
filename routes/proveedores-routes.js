let express = require('express')
let router = express.Router()
let proveedores = require('../controller/proveedores/proveedores-controller')


router.post('/listaproveedores/', proveedores.listaProveedores);

module.exports = router