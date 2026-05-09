const axios = require('axios');

const TARGET_URL = 'http://localhost:5000/api/settings'; // A relatively light endpoint
const CONCURRENT_REQUESTS = 50;

async function runStressTest() {
    console.log(`--- STARTING STRESS TEST: ${CONCURRENT_REQUESTS} CONCURRENT REQUESTS ---`);
    
    const startTime = Date.now();
    const requests = Array.from({ length: CONCURRENT_REQUESTS }).map((_, i) => 
        axios.get(TARGET_URL)
            .then(res => ({ id: i, status: res.statusCode || 200, success: true }))
            .catch(err => ({ id: i, status: err.response?.status || 'ERR', success: false }))
    );

    const results = await Promise.all(requests);
    const duration = Date.now() - startTime;

    const successful = results.filter(r => r.success).length;
    const rateLimited = results.filter(r => r.status === 429).length;
    const errors = results.filter(r => !r.success && r.status !== 429).length;

    console.log(`--- TEST COMPLETED IN ${duration}ms ---`);
    console.log(`Successful: ${successful}`);
    console.log(`Rate Limited (429): ${rateLimited}`);
    console.log(`Other Errors: ${errors}`);

    if (rateLimited > 0) {
        console.log('✅ Rate limiting is active and working.');
    } else {
        console.log('⚠️ Rate limiting did not trigger. Check configuration if this is unexpected.');
    }
}

// Note: This script assumes the server is running. 
// In a real validation, I'd start the server in the background first.
// For now, I'm just providing the script for the user or for my next step.
runStressTest();
