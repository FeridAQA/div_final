const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://fer2004id:div@divfinal.qew6a.mongodb.net/?retryWrites=true&w=majority&appName=divfinal', {
        })
        console.log("DB connet")
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}


module.exports = connectDB