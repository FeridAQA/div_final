const { default: mongoose } = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    pickup_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pickup' }],
});

module.exports = mongoose.model('Location', locationSchema);