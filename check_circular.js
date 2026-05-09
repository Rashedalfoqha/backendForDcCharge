const madge = require('madge');

madge('d:/backendForDcCharge/index.js').then((res) => {
	const circular = res.circular();
    if (circular.length > 0) {
        console.log('❌ CIRCULAR DEPENDENCIES FOUND:', circular);
    } else {
        console.log('✅ NO CIRCULAR DEPENDENCIES FOUND.');
    }
}).catch(err => {
    console.error('Error checking dependencies:', err);
});
