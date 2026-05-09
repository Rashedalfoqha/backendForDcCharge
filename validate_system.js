const fs = require('fs');
const path = require('path');

const BACKEND_PATH = 'd:/backendForDcCharge';
const FRONTEND_PATH = 'd:/FrontEndForDcCharge';

function log(msg, type = 'info') {
    const colors = { info: '\x1b[36m', success: '\x1b[32m', warn: '\x1b[33m', error: '\x1b[31m' };
    console.log(`${colors[type] || ''}[${type.toUpperCase()}] ${msg}\x1b[0m`);
}

async function validate() {
    log('--- STARTING PRODUCTION VALIDATION ---');

    // 1. Environment Variables
    log('Checking Environment Variables...');
    const backendEnv = fs.readFileSync(path.join(BACKEND_PATH, '.env'), 'utf8');
    const requiredBackendVars = ['DB_URL', 'SECRET', 'PORT'];
    requiredBackendVars.forEach(v => {
        if (!backendEnv.includes(v)) log(`Missing required backend env var: ${v}`, 'error');
        else log(`Found ${v}`, 'success');
    });

    // 2. Directories
    log('Checking Directories...');
    const requiredDirs = [path.join(BACKEND_PATH, 'uploads')];
    requiredDirs.forEach(d => {
        if (!fs.existsSync(d)) {
            log(`Directory missing: ${d}. Creating...`, 'warn');
            fs.mkdirSync(d, { recursive: true });
        } else {
            log(`Found directory: ${d}`, 'success');
        }
    });

    // 3. Backend Route Protections
    log('Auditing Backend Route Protections...');
    const routesDir = path.join(BACKEND_PATH, 'routes');
    const routeFiles = fs.readdirSync(routesDir);
    routeFiles.forEach(file => {
        const content = fs.readFileSync(path.join(routesDir, file), 'utf8');
        if (content.includes('router.post') || content.includes('router.put') || content.includes('router.delete')) {
            if (!content.includes('auth') && !content.includes('authentication')) {
                log(`POTENTIAL SECURITY ISSUE: Unprotected write route in ${file}`, 'error');
            } else {
                log(`Route protection found in ${file}`, 'success');
            }
        }
    });

    // 4. Frontend API URLs
    log('Checking Frontend API URLs...');
    const adminPanelPath = path.join(FRONTEND_PATH, 'src/componetes/Admin/AdminPanel.js');
    if (fs.existsSync(adminPanelPath)) {
        const content = fs.readFileSync(adminPanelPath, 'utf8');
        if (content.includes('localhost:5000') && !content.includes('process.env')) {
            log('HARDCODED LOCALHOST URL FOUND in AdminPanel.js', 'warn');
        } else {
            log('API URL handling looks correct in AdminPanel.js', 'success');
        }
    }

    log('--- VALIDATION COMPLETE ---');
}

validate();
