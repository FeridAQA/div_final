const { default: mongoose } = require("mongoose");

const order_listSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], 
}, { timestamps: true });

module.exports = mongoose.model('Order_list', order_listSchema);