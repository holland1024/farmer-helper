const mongoose = require('mongoose');

const SaleRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    seedType: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SaleRequest', SaleRequestSchema);
