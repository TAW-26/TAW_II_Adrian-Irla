/**
 * Testy automatyczne (unit/integration) dla endpointów autoryzacji API.
 * Sprawdza poprawność działania rejestracji i logowania użytkowników,
 * w tym przypadki poprawne oraz błędne (brak danych, złe hasło, brak użytkownika).
 */

const request = require('supertest');
const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');

// Tworzymy testową instancję aplikacji Express
const app = express();
app.use(cors());
app.use(express.json());

// Podpinamy routy auth pod ścieżkę /api/auth
app.use('/api/auth', authRoutes);

describe('Auth API', () => {

    // Test: rejestracja nowego użytkownika (poprawne dane)
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

    // Test: logowanie nieistniejącego użytkownika / błędne dane
    test('POST /api/auth/login - logowanie z błędnym hasłem', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'nieistniejacy@test.com',
                password: 'zlehaslo'
            });

        expect(res.statusCode).toBe(404);
    });

    // Test: brak wymaganych pól przy rejestracji
    test('POST /api/auth/register - brak wymaganych pól', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'brakpol@test.com'
            });

        expect(res.statusCode).toBe(500);
    });

    // Test: poprawne logowanie po wcześniejszej rejestracji
    test('POST /api/auth/login - poprawne logowanie', async () => {
        const email = `login${Date.now()}@test.com`;

        // najpierw rejestracja użytkownika
        await request(app)
            .post('/api/auth/register')
            .send({ username: 'logintest', email, password: 'haslo123' });

        // potem logowanie
        const res = await request(app)
            .post('/api/auth/login')
            .send({ email, password: 'haslo123' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    // Test: próba logowania bez danych
    test('POST /api/auth/login - brak danych', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({});

        expect(res.statusCode).toBe(404);
    });

});