// Obsługa logiki związanej z filmami.
// Zawiera funkcje kontrolera do pobierania, dodawania,
// aktualizowania i usuwania rekordów z tabeli "movies".

const pool = require('../db/db');

// Pobiera wszystkie filmy z bazy danych
const getAllMovies = async (req, res) => {
  try {
    // Wykonanie zapytania SQL zwracającego wszystkie rekordy z tabeli movies
    const result = await pool.query('SELECT * FROM movies');

    // Odesłanie listy filmów w formacie JSON
    res.json(result.rows);
  } catch (err) {
    // Obsługa błędu w przypadku problemu z pobieraniem danych
    res.status(500).json({ message: 'Błąd pobierania filmów', error: err.message });
  }
};

// Dodaje nowy film do bazy danych
const addMovie = async (req, res) => {
  // Pobranie danych filmu z body żądania
  const { title, genre, type, trailer_url } = req.body;

  try {
    // Dodanie nowego rekordu do tabeli movies
    // req.user.id oznacza identyfikator zalogowanego użytkownika
    const result = await pool.query(
        'INSERT INTO movies (title, genre, type, trailer_url, added_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, genre, type, trailer_url, req.user.id]
    );

    // Zwrócenie dodanego filmu
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Obsługa błędu przy dodawaniu filmu
    res.status(500).json({ message: 'Błąd dodawania filmu', error: err.message });
  }
};

// Aktualizuje dane istniejącego filmu
const updateMovie = async (req, res) => {
  // Pobranie id filmu z parametrów URL
  const { id } = req.params;

  // Pobranie nowych danych filmu z body żądania
  const { title, genre, type, trailer_url } = req.body;

  try {
    // Aktualizacja wybranego filmu na podstawie jego id
    const result = await pool.query(
        'UPDATE movies SET title=$1, genre=$2, type=$3, trailer_url=$4 WHERE id=$5 RETURNING *',
        [title, genre, type, trailer_url, id]
    );

    // Zwrócenie zaktualizowanego rekordu
    res.json(result.rows[0]);
  } catch (err) {
    // Obsługa błędu podczas aktualizacji
    res.status(500).json({ message: 'Błąd aktualizacji filmu', error: err.message });
  }
};

// Usuwa film z bazy danych
const deleteMovie = async (req, res) => {
  // Pobranie id filmu z parametrów URL
  const { id } = req.params;

  try {
    // Usunięcie filmu o podanym id
    await pool.query('DELETE FROM movies WHERE id=$1', [id]);

    // Zwrócenie komunikatu potwierdzającego usunięcie
    res.json({ message: 'Film usunięty' });
  } catch (err) {
    // Obsługa błędu przy usuwaniu filmu
    res.status(500).json({ message: 'Błąd usuwania filmu', error: err.message });
  }
};

// Eksport funkcji kontrolera do użycia w trasach
module.exports = { getAllMovies, addMovie, updateMovie, deleteMovie };