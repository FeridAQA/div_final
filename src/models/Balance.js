const { default: mongoose } = require("mongoose");

const balanceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    total_balance: { type: Number, required: true, },
    balance_history: [{
        date: { type: Date, default: Date.now },
        amount: { type: Number, required: true },
        type: {
            type: String, enum: [
                'increment',
                'decrement'
            ], required: true
        },
        description: { type: String },

    }],
}, { timestamps: true });

module.exports = mongoose.model('Balance', balanceSchema);