const { default: mongoose } = require("mongoose");
const Balance = require("../models/Balance")


const all_balance = async () => {
    const balances = await Balance.find()
    return balances
}
const get_balance = async (id) => {
    console.log("bu ==>`", id);

    const balance = await Balance.findById(id)
    console.log(balance);

    return balance

}



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

const incrementUserBalance = async (userId, amount, description) => {
    const balance = await Balance.findOne({ user_id: new mongoose.Types.ObjectId(userId) })

    if (!balance) {
        throw new Error("Balance not found for user");
    }
    balance.total_balance += amount

    balance.balance_history.push({
        amount,
        type: 'increment',
        description
    })

    await balance.save()
    return balance.balance_history
}

const decrementUserBalance = async (userId, amount, description) => {
    console.log("buuuuuuuuuu",userId);
    
    const balance = await Balance.findOne({ user_id: new mongoose.Types.ObjectId(userId) })
    if (!balance) {
        throw new Error("Balance not found for user");
    }
    if (balance.total_balance < amount) {
        throw new Error("Insufficient balance"); // Əgər balans kifayət deyilsə, xəta qaytarılır
    }

    balance.total_balance -=amount
    balance.balance_history.push({
        amount,
        type: 'decrement',
        description
    })
    await balance.save()
    return balance.balance_history
}
module.exports = {
    incrementUserBalance,
    createBalance,
    all_balance,
    get_balance,
    decrementUserBalance
};