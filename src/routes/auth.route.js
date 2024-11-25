const express =require('express')
const loginLimiter = require('../middleware/loginLimiter')
const { c_register_user, c_login } = require('../controller/auth_contr')
const registerValidation = require('../middleware/registerValidation')
const router=express.Router()

router.post('/register',registerValidation,c_register_user)
router.post('/login',loginLimiter,c_login)




module.exports=router