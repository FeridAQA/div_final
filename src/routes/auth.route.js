const express =require('express')
const loginLimiter = require('../middleware/loginLimiter')
const { c_register_user, c_login } = require('../controller/auth_contr')
const router=express.Router()

router.post('/register',c_register_user)
router.post('/login',loginLimiter,c_login)




module.exports=router