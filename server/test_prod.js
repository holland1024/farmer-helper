
const API_URL = "https://farmer-helper-flame.vercel.app/api";

async function testBackend() {
    console.log("Testing Backend at:", API_URL);

    // 1. Test GET Seeds (Read Check)
    try {
        console.log("1. GET /api/seeds...");
        const res = await fetch(`${API_URL}/seeds`);
        if (!res.ok) throw new Error(`Status: ${res.status} ${res.statusText}`);
        const data = await res.json();
        console.log("✅ GET Success. Seeds found:", data.length);
    } catch (err) {
        console.error("❌ GET Failed:", err.message);
        if (err.cause) console.error("Cause:", err.cause);
    }

    // 2. Test POST Complaint (Write Check)
    try {
        console.log("\n2. POST /api/complaints...");
        const newComplaint = {
            name: "Debug Bot",
            mobile: "9999999999",
            details: "Connection Test " + Date.now(),
            department: "IT Support"
        };

        const res = await fetch(`${API_URL}/complaints`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComplaint)
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Status: ${res.status} ${res.statusText} - ${errText}`);
        }

        const savedData = await res.json();
        console.log("✅ POST Success! Complaint stored. ID:", savedData._id);
    } catch (err) {
        console.error("❌ POST Failed:");
        console.error(err.message);
        if (err.cause) console.error("Cause:", err.cause);
    }
}

testBackend();
