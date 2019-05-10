let express = require('express')
let router = express.Router()
let sorteos = require('../controller/sorteos/sorteos-controller')


router.post('/sorteosGet/', sorteos.sorteosGet);

module.exports = router