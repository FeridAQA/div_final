const express =require('express')
const { c_createOrder, c_get_user_order, c_order_find_by_id, c_order_all, c_update_order, c_delete_order, c_update_order_to_canceled } = require('../controller/order_contr')
const roleMiddleware = require('../middleware/role.middleware')
const router=express.Router()

router.post('/create',c_createOrder)
router.get('/orders',c_get_user_order)
router.get('/order_id/:order_id',c_order_find_by_id)
router.put('/update_user/:orderId',c_update_order_to_canceled)


//admin


router.get('/all',roleMiddleware('admin'),c_order_all)
router.put('/update/:orderId',roleMiddleware('admin'),c_update_order)
router.delete('/delete/:orderId',roleMiddleware('admin'),c_delete_order)

module.exports=router