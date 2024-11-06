const { default: mongoose } = require("mongoose");

const pickupSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    adress: { type: String, required: true, },
    cordinate: [{
        lat: { type: String, required: true, },
        lng: { type: String, required: true, },

    }],
});

module.exports = mongoose.model('Pickup', pickupSchema);