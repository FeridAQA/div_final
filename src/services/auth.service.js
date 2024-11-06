const User = require("../models/User")
const { verifyPassword, hashPassword } = require("../utils/bcrypt")
const { encodePayload } = require("../utils/jwt")

const register_user = async (params) => {
    params.password = await hashPassword(params.password)
     const user = new User(params)
     const savedUser = await user.save()
     savedUser.password=undefined
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