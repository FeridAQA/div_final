const express =require('express')
const roleMiddleware = require('../middleware/role.middleware')
const { c_all_order_list, c_user_order_list } = require('../controller/order_list_contr')
const router=express.Router()

router.get('/all_order_list',roleMiddleware('admin'),c_all_order_list)
router.get('/user_id',c_user_order_list)

module.exports=router