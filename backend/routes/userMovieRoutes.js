/**
 * Definiuje trasy (API endpoints) związane z listą filmów użytkownika.
 * Umożliwia pobieranie filmów użytkownika, dodawanie filmu do listy,
 * aktualizację statusu filmu oraz usuwanie filmu z listy.
 * Wszystkie operacje są zabezpieczone tokenem JWT (verifyToken).
 */

const express = require('express');
const router = express.Router();

const {
    getUserMovies,     // pobiera wszystkie filmy użytkownika
    addToList,         // dodaje film do listy użytkownika
    updateStatus,      // aktualizuje status filmu (np. obejrzany / do obejrzenia)
    removeFromList     // usuwa film z listy użytkownika
} = require('../controllers/userMovieController');

const { verifyToken } = require('../middleware/auth');

// Pobranie listy filmów zalogowanego użytkownika
router.get('/', verifyToken, getUserMovies);

// Dodanie filmu do listy użytkownika
router.post('/', verifyToken, addToList);

// Aktualizacja statusu filmu po ID
router.put('/:id', verifyToken, updateStatus);

// Usunięcie filmu z listy po ID
router.delete('/:id', verifyToken, removeFromList);

module.exports = router;