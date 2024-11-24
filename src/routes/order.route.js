const express =require('express')
const { c_createOrder, c_get_user_order, c_order_find_by_id } = require('../controller/order_contr')
const router=express.Router()

router.post('/create',c_createOrder)
router.get('/orders',c_get_user_order)
router.get('/:order_id',c_order_find_by_id)

module.exports=router