const { default: mongoose } = require("mongoose");

const generalSchema = new mongoose.Schema({
    logo: { type: String, required: true, },
    sitename: { type: String, required: true, },
    about: { type: String, required: true, },
    contact: { type: String, required: true, },
    details: { type: String, required: true, },

}, { timestamps: true });

module.exports = mongoose.model('General', generalSchema);