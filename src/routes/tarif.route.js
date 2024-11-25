const express =require('express')
const { c_find_all_tarif } = require('../controller/tarif_contr')
const router=express.Router()

router.get('/all',c_find_all_tarif)

module.exports=router