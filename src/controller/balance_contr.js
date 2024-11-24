const { incrementUserBalance, all_balance, get_balance, decrementUserBalance } = require("../services/balance.service");

const c_increment_user_balance = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { amount, description } = req.body;
        // istifadəçi body ilə öz başına mənfi göndərə biləsin 
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        console.log(user_id, amount, description);
        const updatedBalance = await incrementUserBalance(user_id, amount, description);
        return res.status(200).json({ message: "Balance updated successfully", updatedBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const c_decrement_user_balance=async (req,res)=>{
    try {
        const user_id = req.params.userId
        console.log("reqparams",req.params);
        
        const { amount, description } = req.body;
        // istifadəçi body ilə öz başına mənfi göndərə biləsin 
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        console.log(user_id, amount, description);
        const updatedBalance = await decrementUserBalance(user_id, amount, description);
        return res.status(200).json({ message: "Balance updated successfully", updatedBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


const c_all_balance = async (req, res) => {
    try {
        let balances = await all_balance()
        res.status(200).json(balances)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const c_user_balance = async (req, res) => {
    try {
        console.log(req.user);
        
        const id = req.user.balance_id
        // console.log(id);
        
        let balance = await get_balance(id)
        // console.log(balance);
        
        res.status(200).json(balance)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    c_increment_user_balance,
    c_decrement_user_balance,
    c_all_balance,
    c_user_balance,
};
