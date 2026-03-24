const pool = require('../db/db');

const getUserMovies = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT um.*, m.title, m.genre, m.type, m.trailer_url FROM user_movies um JOIN movies m ON um.movie_id = m.id WHERE um.user_id = $1',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Błąd pobierania listy', error: err.message });
  }
};

const addToList = async (req, res) => {
  const { movie_id, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO user_movies (user_id, movie_id, status) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, movie_id, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Błąd dodawania do listy', error: err.message });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, rating } = req.body;
  try {
    const result = await pool.query(
      'UPDATE user_movies SET status=$1, rating=$2 WHERE id=$3 AND user_id=$4 RETURNING *',
      [status, rating, id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Błąd aktualizacji', error: err.message });
  }
};

const removeFromList = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM user_movies WHERE id=$1 AND user_id=$2', [id, req.user.id]);
    res.json({ message: 'Usunięto z listy' });
  } catch (err) {
    res.status(500).json({ message: 'Błąd usuwania z listy', error: err.message });
  }
};

module.exports = { getUserMovies, addToList, updateStatus, removeFromList };