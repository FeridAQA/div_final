const User = require("../models/User")
const { verifyPassword, hashPassword } = require("../utils/bcrypt")
const { encodePayload } = require("../utils/jwt")
const { createBalance } = require("./balance.service")

const register_user = async (params) => {
    try {
        // Şifrənin hash olunması
        params.password = await hashPassword(params.password);

        // İstifadəçi yaradılması
        const user = new User(params);
        const savedUser = await user.save();

        // Balansın yaradılması
        const balance = await createBalance(savedUser._id);
        savedUser.balance_id = balance._id;

        // Yenilənmiş istifadəçinin saxlanması
        await savedUser.save();

        // Şifrənin müvəqqəti undefined edilməsi
        savedUser.password = undefined;

        console.log("ferid", savedUser);
        return savedUser;
    } catch (error) {
        console.error("Xəta baş verdi:", error);
        throw error; // Xətanı qaytar
    }
};




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