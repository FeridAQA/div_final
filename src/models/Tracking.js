const { default: mongoose } = require("mongoose");

const trackingSchema = new mongoose.Schema({
    tracking_status: {
        type: String, enum: [
            'pending',
            'cargo',
            'foreign_warehouse',
            'foreign_warehouse_cargo',
            'custom',
            'custom_cargo',
            'domestic_warehouse',
            'domestic_warehouse_cargo',
            'pickup',
        ], default: 'pending'
    },
    order_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

module.exports = mongoose.model('Tracking', trackingSchema);