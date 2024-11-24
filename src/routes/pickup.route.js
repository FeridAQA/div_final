const express =require('express')
const { c_create_pickup, c_get_all_pickup } = require('../controller/pickup_contr')
const router=express.Router()

router.post('/create',c_create_pickup)
router.get('/all',c_get_all_pickup)

module.exports=router