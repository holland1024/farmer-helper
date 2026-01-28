const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    availability: { type: Boolean, default: true },
    price: { type: Number, required: true },
    weight: { type: String, required: true }, // e.g. "50kg bag"
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
