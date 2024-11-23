const express =require('express')
const { c_increment_user_balance, c_all_balance, c_user_balance, c_decrement_user_balance } = require('../controller/balance_contr')
const roleMiddleware = require('../middleware/role.middleware')
const router=express.Router()

router.get('/all_balanse',roleMiddleware('admin'),c_all_balance)
router.get('/user_id',c_user_balance)
router.post('/increment',c_increment_user_balance)
router.post('/decrement',c_decrement_user_balance)

module.exports=router