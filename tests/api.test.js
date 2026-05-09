const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

// Mock Mongoose models before requiring routes
jest.mock('../models/Transaction', () => ({
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue([]),
    aggregate: jest.fn().mockResolvedValue([])
}));

jest.mock('../models/Invoice', () => ({ find: jest.fn().mockReturnThis(), sort: jest.fn().mockReturnThis(), limit: jest.fn().mockReturnThis(), lean: jest.fn().mockResolvedValue([]) }));
jest.mock('../models/Subscription', () => ({ find: jest.fn().mockReturnThis(), sort: jest.fn().mockReturnThis(), limit: jest.fn().mockReturnThis(), lean: jest.fn().mockResolvedValue([]) }));
jest.mock('../models/Notification', () => ({ find: jest.fn().mockReturnThis(), sort: jest.fn().mockReturnThis(), limit: jest.fn().mockReturnThis(), lean: jest.fn().mockResolvedValue([]) }));
jest.mock('../models/ActivityLog', () => ({ find: jest.fn().mockReturnThis(), sort: jest.fn().mockReturnThis(), limit: jest.fn().mockReturnThis(), lean: jest.fn().mockResolvedValue([]) }));
jest.mock('../models/userAdmin', () => ({ find: jest.fn().mockReturnThis(), lean: jest.fn().mockResolvedValue([]), aggregate: jest.fn().mockResolvedValue([]) }));
jest.mock('../models/settings', () => ({
    findOne: jest.fn().mockResolvedValue({}),
    findOneAndUpdate: jest.fn().mockResolvedValue({})
}));
jest.mock('../models/messages', () => ({ find: jest.fn().mockReturnThis(), sort: jest.fn().mockReturnThis(), limit: jest.fn().mockReturnThis(), lean: jest.fn().mockResolvedValue([]) }));

jest.mock('../models/subscribers', () => ({ find: jest.fn().mockReturnThis(), lean: jest.fn().mockResolvedValue([]) }));

const app = express();
app.use(express.json());

// Mock process.env.SECRET for tests
process.env.SECRET = 'test_secret';

// Require routes AFTER mocking
app.use('/api/settings', require('../routes/settings'));
app.use('/api/dashboard', require('../routes/dashboard'));

describe('API Security & Accessibility', () => {
    
    test('GET /api/settings should be public', async () => {
        const res = await request(app).get('/api/settings');
        expect(res.statusCode).not.toBe(401);
    });

    test('GET /api/dashboard/stats should be protected', async () => {
        const res = await request(app).get('/api/dashboard/stats');
        expect(res.statusCode).toBe(401);
    });

    test('PUT /api/settings should be protected', async () => {
        const res = await request(app).put('/api/settings').send({ siteName: 'New Name' });
        expect(res.statusCode).toBe(401);
    });

    test('Valid token should allow access to protected routes', async () => {
        const token = jwt.sign({ userId: '123', role: { permissions: [] } }, process.env.SECRET);
        const res = await request(app)
            .get('/api/dashboard/stats')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(200);
    });
});
