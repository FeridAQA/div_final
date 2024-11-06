const { default: mongoose } = require("mongoose");
const Balance = require("../models/Balance")


const createBalance = async (userId) => {
    try {
        const balance = await Balance.create({
            user_id: userId,
            total_balance: 0,
            balance_history: []
        });
        return balance;
    } catch (error) {
        throw new Error('Balance yaratma zamanı xəta baş verdi');
    }
};

const incrementUserBalance=async (userId ,amount, description)=>{
    const balance =await Balance.findOne({ user_id: new mongoose.Types.ObjectId(userId) })
    
    if(!balance){
        throw new Error("Balance not found for user");
    }
    balance.total_balance+=amount

    balance.balance_history.push({
        amount,
        type: 'increment',
        description
    })

    await balance.save()
    return balance
}

module.exports = {
    incrementUserBalance,
    createBalance,
};