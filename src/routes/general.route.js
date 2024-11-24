const express =require('express')
const { c_create_gen, c_find_gen, c_update_gen } = require('../controller/general_contr')
const router=express.Router()

router.get('/all',c_find_gen)
router.post('/create',c_create_gen)
router.put('/update/:id',c_update_gen)

module.exports=router