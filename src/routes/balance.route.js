const express =require('express')
const { c_increment_user_balance } = require('../controller/balance_contr')
const router=express.Router()

router.post('/increment',c_increment_user_balance)

module.exports=router