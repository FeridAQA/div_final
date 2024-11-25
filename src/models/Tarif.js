const { default: mongoose } = require("mongoose");

const tarifSchema = new mongoose.Schema({
    country: {
        type: String, enum: [
            "TUR",
            "USA",
            "ENG"
        ]
    },
    rates: [{
        weight_range: { type: String, required: true, },
        price: { type: Number, required: true, },
    }
    ]

}, { timestamps: true });

module.exports = mongoose.model('Tarif', tarifSchema);