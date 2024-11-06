const { incrementUserBalance } = require("../services/balance.service");

const c_increment_user_balance = async (req, res) => {
    try {
        const user_id = req.user._id; 
        
        const { amount, description } = req.body;
        // istifadəçi body ilə öz başına mənfi göndərə biləsin 
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        console.log(user_id,amount,description);
        const updatedBalance = await incrementUserBalance(user_id, amount, description);
        return res.status(200).json({ message: "Balance updated successfully", updatedBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    c_increment_user_balance,
};