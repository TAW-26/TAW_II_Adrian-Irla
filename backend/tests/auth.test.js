const request = require('supertest');
const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API', () => {

    test('POST /api/auth/register - rejestracja nowego użytkownika', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: `test${Date.now()}@test.com`,
                password: 'haslo123'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
    });

    test('POST /api/auth/login - logowanie z błędnym hasłem', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'nieistniejacy@test.com',
                password: 'zlehaslo'
            });
        expect(res.statusCode).toBe(404);
    });

    test('POST /api/auth/register - brak wymaganych pól', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'brakpol@test.com'
            });
        expect(res.statusCode).toBe(500);
    });

    test('POST /api/auth/login - poprawne logowanie', async () => {
        const email = `login${Date.now()}@test.com`;
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'logintest', email, password: 'haslo123' });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email, password: 'haslo123' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('POST /api/auth/login - brak danych', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({});
        expect(res.statusCode).toBe(404);
    });

});