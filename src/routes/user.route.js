const express =require('express')
const { c_find_all_user, c_find_user_by_Id, c_delete_user_Id } = require('../controller/user_contr')
const router=express.Router()

router.get('/find_all',c_find_all_user)
router.get('/:user_id',c_find_user_by_Id)
router.delete('/:user_id',c_delete_user_Id)




module.exports=router