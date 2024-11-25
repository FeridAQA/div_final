const express =require('express')
const { c_create_gen, c_find_gen, c_update_gen } = require('../controller/general_contr')
const { authMiddleware } = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const router=express.Router()

router.get('/all',c_find_gen)
router.post('/create', authMiddleware ,roleMiddleware('admin'),c_create_gen)
router.put('/update/:id', authMiddleware ,roleMiddleware('admin'),c_update_gen)

module.exports=router