const Balance = require("../models/Balance");
const { login, register_user } = require("../services/auth.service");

const c_register_user = async (req, res) => {
    try {
        // əgər kimsə rol daxil etmək istəsə birinci onu sil 
        // default user getsin qoy
        // if (req.body.role) {
        //     delete req.body.role;
        // }
        let user = await register_user({ ...req.body })
        
   
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


const c_login = async (req, res) => {
    try {
        let user = await login({ ...req.body })
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    c_register_user,
    c_login,
}