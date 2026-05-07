// Odpowiada za definicję tras (endpointów) związanych z autoryzacją użytkownika,
// takich jak rejestracja i logowanie. Łączy konkretne ścieżki API z funkcjami kontrolera.

const express = require('express');
const router = express.Router();

// Import funkcji obsługujących logikę rejestracji i logowania
const { register, login } = require('../controllers/authController');

// Endpoint do rejestracji nowego użytkownika
router.post('/register', register);

// Endpoint do logowania użytkownika
router.post('/login', login);

// Eksport routera, aby można było go użyć w głównym pliku serwera
module.exports = router;