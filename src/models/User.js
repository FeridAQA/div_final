const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    surname: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_num: { type: Number, required: true },
    gender: { type: Boolean, required: true, },
    seria: { type: String, required: true, unique: true },
    fin: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, 
    order_list_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order_list' }], 
    balance_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Balance' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);