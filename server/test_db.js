require('dotenv').config();
const mongoose = require('mongoose');

console.log("Testing MongoDB Connection...");
console.log("URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ SUCCESS: Successfully connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ ERROR: Connection failed.");
        console.error(err);
        process.exit(1);
    });
