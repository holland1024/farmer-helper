require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    console.log("Testing Gemini API Integration...");
    const key = process.env.GEMINI_API_KEY;
    if (!key) { console.error("Missing Key"); return; }

    try {
        const genAI = new GoogleGenerativeAI(key);
        console.log("Trying model: gemini-1.5-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent("Hello");
        console.log("SUCCESS:", await result.response.text());
    } catch (error) {
        console.error("FAILURE CODE:", error.status); // 404
        console.error("FAILURE MSG:", error.message);
    }
}

testGemini();
