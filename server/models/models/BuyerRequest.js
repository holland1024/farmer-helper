const mongoose = require('mongoose');

const BuyerRequestSchema = new mongoose.Schema({
    farmerName: { type: String, required: true },
    mobile: { type: String, required: true },
    productName: { type: String, required: true },
    productType: { type: String, enum: ['Seed', 'Fertilizer'], required: true },
    quantity: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BuyerRequest', BuyerRequestSchema);
