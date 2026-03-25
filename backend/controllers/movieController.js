const pool = require('../db/db');

const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Błąd pobierania filmów', error: err.message });
  }
};

const addMovie = async (req, res) => {
  const { title, genre, type, trailer_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO movies (title, genre, type, trailer_url, added_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, genre, type, trailer_url, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Błąd dodawania filmu', error: err.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, genre, type, trailer_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE movies SET title=$1, genre=$2, type=$3, trailer_url=$4 WHERE id=$5 RETURNING *',
      [title, genre, type, trailer_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Błąd aktualizacji filmu', error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM movies WHERE id=$1', [id]);
    res.json({ message: 'Film usunięty' });
  } catch (err) {
    res.status(500).json({ message: 'Błąd usuwania filmu', error: err.message });
  }
};

module.exports = { getAllMovies, addMovie, updateMovie, deleteMovie };