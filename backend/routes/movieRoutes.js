const express = require('express');
const router = express.Router();
const { getAllMovies, addMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

router.get('/', verifyToken, getAllMovies);
router.post('/', verifyToken, verifyAdmin, addMovie);
router.put('/:id', verifyToken, verifyAdmin, updateMovie);
router.delete('/:id', verifyToken, verifyAdmin, deleteMovie);

module.exports = router;