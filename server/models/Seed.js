const mongoose = require('mongoose');

const seedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }, // URL to image
    availability: { type: Boolean, default: true },
    price: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Seed', seedSchema);
