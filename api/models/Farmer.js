const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    landSize: { type: Number, required: true }, // in acres
    mainCrop: { type: String, required: true },
    enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);
