/**
 * Definiuje trasy (API endpoints) dla operacji na filmach.
 * Obsługuje pobieranie, dodawanie, edycję i usuwanie filmów.
 * Wszystkie trasy są zabezpieczone autoryzacją JWT,
 * a operacje administracyjne wymagają uprawnień admina.
 */

const express = require('express');
const router = express.Router();

// Import kontrolerów odpowiedzialnych za logikę biznesową filmów
const {
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');

// Middleware do autoryzacji użytkownika i sprawdzania roli admina
const { verifyToken, verifyAdmin } = require('../middleware/auth');

/**
 * GET /
 * Pobiera listę wszystkich filmów
 * Wymaga zalogowanego użytkownika (token JWT)
 */
router.get('/', verifyToken, getAllMovies);

/**
 * POST /
 * Dodaje nowy film do bazy danych
 * Wymaga zalogowanego użytkownika oraz uprawnień administratora
 */
router.post('/', verifyToken, verifyAdmin, addMovie);

/**
 * PUT /:id
 * Aktualizuje dane filmu o podanym ID
 * Wymaga zalogowanego użytkownika oraz uprawnień administratora
 */
router.put('/:id', verifyToken, verifyAdmin, updateMovie);

/**
 * DELETE /:id
 * Usuwa film o podanym ID
 * Wymaga zalogowanego użytkownika oraz uprawnień administratora
 */
router.delete('/:id', verifyToken, verifyAdmin, deleteMovie);

// Eksport routera, aby mógł być użyty w głównej aplikacji Express
module.exports = router;