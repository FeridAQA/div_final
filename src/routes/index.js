const express = require("express");
const router = express.Router();

const auth_route=require('./auth.route')
const user_route=require('./user.route.js');
const balance_route=require('./balance.route.js');
const { authMiddleware } = require("../middleware/auth.middleware.js");
const roleMiddleware = require("../middleware/role.middleware.js");

router.use('/auth',auth_route)
router.use('/balance',authMiddleware ,balance_route)
router.use('/user', authMiddleware ,roleMiddleware('admin'),user_route)

module.exports=router