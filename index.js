const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log("Startup Check - OpenAI Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Not Found");
console.log("Startup Check - Gemini Key:", process.env.GEMINI_API_KEY ? "Loaded (" + process.env.GEMINI_API_KEY.substring(0, 5) + "...)" : "Not Found");

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle Preflight immediately
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});
app.use(express.json());

// Database Connection (Serverless Optimized)
let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    // Hardcoded Connection (Standard String)
    const URI = "mongodb+srv://pragadeeshwaran1024_db_user:Pragadeesh1024%23@cluster0.ufwtjbi.mongodb.net/farmer-app?retryWrites=true&w=majority";

    if (!URI) {
        throw new Error("MONGODB_URI is missing!");
    }

    try {
        cachedConnection = await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB Connected (Hardcoded)");
        return cachedConnection;
    } catch (err) {
        console.error("MongoDB Connection Failed:", err);
        throw err;
    }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
    // Skip DB connection for simple health check
    if (req.path === '/') return next();

    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database Error on Request:", err);
        res.status(500).json({ error: "Database Connection Failed", details: err.message });
    }
});

const Farmer = require('./models/Farmer');
const Seed = require('./models/Seed');
const Fertilizer = require('./models/Fertilizer');
const SaleRequest = require('./models/SaleRequest');
const Complaint = require('./models/Complaint');
const BuyerRequest = require('./models/BuyerRequest');

// -- Buyer Request Routes --
app.post('/api/buy-requests', async (req, res) => {
    try {
        const newRequest = new BuyerRequest(req.body);
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/buy-requests', async (req, res) => {
    try {
        const requests = await BuyerRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -- Sale Request Routes --
app.post('/api/sales', async (req, res) => {
    try {
        const newSale = new SaleRequest(req.body);
        await newSale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/sales', async (req, res) => {
    try {
        const sales = await SaleRequest.find().sort({ createdAt: -1 });
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -- Complaint Routes --
app.post('/api/complaints', async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body);
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -- AI Chat Integration (Gemini / Mock) --
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.post('/api/ai/chat', async (req, res) => {
    const { message, language } = req.body;

    if (!message) return res.status(400).json({ reply: "Please say something!" });
    console.log("Request:", message);

    // 1. Try Google Gemini AI first
    if (process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.startsWith("disabled")) {
        try {
            console.log("Attempting Gemini AI with Key:", process.env.GEMINI_API_KEY.substring(0, 5) + "...");
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const systemPrompt = language === 'ta'
                ? "Neengal oru vivasaya nipunar (Expert Agricultural Assistant). Vivasayigalukum makkalukum udhavungal. Kelviku Tamilil badhil alikkavum. Keep answers concise."
                : "You are an expert agricultural assistant. Help farmers with crops, seeds, fertilizers, and weather. If the user asks in Tamil, reply in Tamil. Keep answers concise and helpful.";

            const result = await model.generateContent([systemPrompt, message]);
            const response = await result.response;
            const text = response.text();

            return res.json({ reply: text });
        } catch (err) {
            console.error("Gemini Error:", err.message);
            console.log("Falling back to Mock Mode...");
            // Fallthrough to Mock Mode
        }
    }

    // 2. Mock Mode (Fallback)
    console.log("Using Smart Mock AI (No Gemini Key or Error)");

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const msg = message.toLowerCase();
    let reply = "";

    if (msg.includes("rice") || msg.includes("paddy")) {
        reply = language === 'ta'
            ? "நெல் சாகுபடிக்கு யூரியா மற்றும் டி.ஏ.பி உரங்களைப் பயன்படுத்தலாம். நீர் மேலாண்மை மிக முக்கியம்."
            : "For rice cultivation, ensure proper irrigation. Use Urea and DAP fertilizers as per soil health card.";
    } else if (msg.includes("weather") || msg.includes("rain")) {
        reply = language === 'ta'
            ? "இன்று வானிலை நன்றாக உள்ளது. மழை வாய்ப்பு குறைவு."
            : "The weather looks clear today with low chance of rain. Good for harvesting.";
    } else if (msg.includes("fertilizer") || msg.includes("uram")) {
        reply = language === 'ta'
            ? "பயிரின் தேவைக்கேற்ப உரம் இடவும். இயற்கை உரம் சிறந்தது."
            : "Check our Fertilizer Market section for current stock and prices of Urea and Potash.";
    } else if (msg.includes("pest") || msg.includes("insect") || msg.includes("poochi")) {
        reply = language === 'ta'
            ? "பூச்சி தாக்குதலுக்கு வேப்பெண்ணெய் கரைசல் தெளிக்கலாம். விவரங்களுக்கு எங்கள் வல்லுநரை அழைக்கவும்."
            : "For pest control, organic Neem oil spray is effective. For serious infestations, consult our experts.";
    } else if (msg.includes("price") || msg.includes("rate") || msg.includes("vilai")) {
        reply = language === 'ta'
            ? "சந்தை நிலவரம் தினமும் மாறக்கூடியது. விவரங்களுக்கு 'சந்தை' பக்கத்தைப் பார்க்கவும்."
            : "Market prices fluctuate daily. Please check the 'Market' section for today's rates.";
    } else if (msg.includes("scheme") || msg.includes("loan") || msg.includes("subsidy")) {
        reply = language === 'ta'
            ? "விவசாயக் கடன் மற்றும் மானியங்களுக்கு உங்கள் அருகில் உள்ள வேளாண் அலுவலகத்தை அணுகவும்."
            : "For government subsidies and loans, please visit your nearest Agriculture Office or the PM-KISAN website.";
    } else if (msg.includes("hello") || msg.includes("hi") || msg.includes("vanakkam")) {
        reply = language === 'ta'
            ? "வணக்கம்! நான் உங்களுக்கு எப்படி உதவ முடியும்?"
            : "Hello! I am your farming assistant. Ask me about crops, seeds, or weather.";
    } else {
        const randomFacts = [
            "Did you know? Crop rotation helps maintain soil health and reduces pest buildup.",
            "Tip: Drip irrigation saves water and improves nutrient delivery to roots.",
            "Fact: Earthworms are a farmer's best friend as they aerate the soil naturally.",
            "Advice: Always test your soil pH before applying fertilizers for better yield.",
            "Did you know? Mulching preserves soil moisture and suppresses weed growth.",
            "Tip: Early morning is the best time to water crops to minimize evaporation.",
            "Fact: Legume crops like beans fix nitrogen from the air into the soil.",
            "Advice: Rotate chemical pesticides with organic ones to prevent pest resistance."
        ];
        const randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];

        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(message)}`;
        reply = language === 'ta'
            ? `மன்னிக்கவும், எனக்கு அது பற்றி தெரியவில்லை. \n\n💡 *வேளாண் துணுக்கு:* ${randomFact} \n\nகூகுளில் தேட இங்கே கிளிக் செய்யவும்: [Google Search](${googleSearchUrl})`
            : `I'm not sure about that. \n\n💡 *Farming Fact:* ${randomFact} \n\nTry searching on Google: [Click Here](${googleSearchUrl})`;
    }

    return res.json({ reply });
});

// -- Fertilizer Routes --

// Get all fertilizers
app.get('/api/fertilizers', async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find().sort({ updatedAt: -1 });
        res.json(fertilizers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Fertilizer (Admin)
app.post('/api/fertilizers', async (req, res) => {
    try {
        const newFertilizer = new Fertilizer(req.body);
        const savedFertilizer = await newFertilizer.save();
        res.status(201).json(savedFertilizer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Fertilizer Availability
app.patch('/api/fertilizers/:id', async (req, res) => {
    try {
        const updatedFertilizer = await Fertilizer.findByIdAndUpdate(
            req.params.id,
            { availability: req.body.availability },
            { new: true }
        );
        res.json(updatedFertilizer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// -- Basic Route --
app.get('/', (req, res) => {
    res.send('Farmer App Backend is Running');
});

app.get('/api', (req, res) => {
    res.send('Farmer App Backend is Running');
});

// -- Seed Routes --

// Get all seeds
app.get('/api/seeds', async (req, res) => {
    try {
        const seeds = await Seed.find().sort({ updatedAt: -1 });
        res.json(seeds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add/Update Seed (Admin)
app.post('/api/seeds', async (req, res) => {
    try {
        const newSeed = new Seed(req.body);
        const savedSeed = await newSeed.save();
        res.status(201).json(savedSeed);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Availability
app.patch('/api/seeds/:id', async (req, res) => {
    try {
        const updatedSeed = await Seed.findByIdAndUpdate(
            req.params.id,
            { availability: req.body.availability },
            { new: true }
        );
        res.json(updatedSeed);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// -- Farmer Routes --

// Enroll a new farmer
app.post('/api/farmers', async (req, res) => {
    try {
        const newFarmer = new Farmer(req.body);
        const savedFarmer = await newFarmer.save();
        res.status(201).json(savedFarmer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all enrolled farmers
app.get('/api/farmers', async (req, res) => {
    try {
        const farmers = await Farmer.find().sort({ enrolledAt: -1 });
        res.json(farmers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server (Only for local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
