const express = require('express');
const router = express.Router();
const { getUserMovies, addToList, updateStatus, removeFromList } = require('../controllers/userMovieController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, getUserMovies);
router.post('/', verifyToken, addToList);
router.put('/:id', verifyToken, updateStatus);
router.delete('/:id', verifyToken, removeFromList);

module.exports = router;