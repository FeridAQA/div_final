const User = require("../models/User")
const { verifyPassword, hashPassword } = require("../utils/bcrypt")
const { encodePayload } = require("../utils/jwt")
const { createBalance } = require("./balance.service")

const register_user = async (params) => {
    params.password = await hashPassword(params.password)
    const user = new User(params)
    const balance=await createBalance(user._id)
    user.balance_id=balance._id
    const savedUser = await user.save()
    savedUser.password=undefined
    
    // console.log(balance);
     console.log("ferid",savedUser);
     return savedUser
     
 }



const login = async (params) => {
    let user = await User.findOne({ email: params.email })
    if (!user) {
        return { error: 'Email və ya şifrə səhvdir', status: 401 }
    }
    const isValidPassword = await verifyPassword(params.password, user.password)
    if (!isValidPassword) {
        return {
            error: 'Email və ya şifrə səhvdir', status: 401 }
    }

    user.password=undefined
    

    const payload={
        user_id:user._id,
        role:user.role
    }
    const token = encodePayload(payload)

    return {token}



}

module.exports={
    register_user,
    login
}