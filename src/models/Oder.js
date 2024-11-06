const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    price: { type: Number, required: true, },
    user_name: { type: String, required: true },
    order_status: {
        type: String, enum: [
            'pending',
            'accepted',
            'change_price',
            'insufficient_balance',
            'out_of_stock',
            'complete',
            'failed',
            'canceled',
            'rejected'
        ], default: 'pending'
    },
    location_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);