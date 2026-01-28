const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    department: { type: String, default: 'General' },
    details: { type: String, required: true },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
