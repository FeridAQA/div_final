const express =require('express')
const { c_find_all_tarif, c_create_tarif, c_delete_tarif, c_update_tarif } = require('../controller/tarif_contr')
const { authMiddleware } = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const router=express.Router()

router.get('/all',c_find_all_tarif)
router.post('/create', authMiddleware, roleMiddleware('admin'),c_create_tarif)
router.delete('/:id', authMiddleware, roleMiddleware('admin'),c_delete_tarif)
router.put('/:id', authMiddleware, roleMiddleware('admin'),c_update_tarif)

module.exports=router