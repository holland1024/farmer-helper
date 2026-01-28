// Quick test script to verify deployment
const https = require('https');

const API_URL = 'https://farmer-helper-flame.vercel.app';

console.log('Testing Farmer Helper Backend...\n');

// Test 1: Root endpoint
https.get(`${API_URL}/`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('✅ Root endpoint:', res.statusCode === 200 ? 'WORKING' : 'FAILED');
        console.log('   Response:', data.substring(0, 50));
    });
}).on('error', (err) => {
    console.log('❌ Root endpoint FAILED:', err.message);
});

// Test 2: API endpoint
setTimeout(() => {
    https.get(`${API_URL}/api/seeds`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('\n✅ Seeds endpoint:', res.statusCode === 200 ? 'WORKING' : 'FAILED');
            if (res.statusCode === 200) {
                try {
                    const seeds = JSON.parse(data);
                    console.log(`   Found ${seeds.length} seeds in database`);
                } catch (e) {
                    console.log('   Response:', data.substring(0, 50));
                }
            } else {
                console.log('   Status:', res.statusCode);
                console.log('   Response:', data.substring(0, 100));
            }
        });
    }).on('error', (err) => {
        console.log('❌ Seeds endpoint FAILED:', err.message);
    });
}, 1000);

console.log('Waiting for responses...\n');
