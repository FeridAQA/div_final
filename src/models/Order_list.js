const { default: mongoose } = require("mongoose");

const order_listSchema = new mongoose.Schema({
    order_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], 
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Order_list', order_listSchema);