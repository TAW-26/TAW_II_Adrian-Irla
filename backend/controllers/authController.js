// Obsługa autoryzacji użytkowników:
// - rejestracja nowego konta,
// - logowanie istniejącego użytkownika,
// - szyfrowanie haseł,
// - generowanie tokenów JWT po poprawnym zalogowaniu.

const pool = require('../db/db'); // Połączenie z bazą danych PostgreSQL
const bcrypt = require('bcrypt'); // Biblioteka do hashowania i porównywania haseł
const jwt = require('jsonwebtoken'); // Biblioteka do tworzenia tokenów JWT
require('dotenv').config(); // Wczytuje zmienne środowiskowe z pliku .env

// Funkcja odpowiedzialna za rejestrację użytkownika
const register = async (req, res) => {
  // Pobranie danych z body żądania
  const { username, email, password } = req.body;

  try {
    // Zaszyfrowanie hasła przed zapisaniem do bazy
    const hashedPassword = await bcrypt.hash(password, 10);

    // Dodanie nowego użytkownika do tabeli users
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, role',
        [username, email, hashedPassword]
    );

    // Zwrócenie danych nowo utworzonego użytkownika
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Obsługa błędów podczas rejestracji
    res.status(500).json({ message: 'Błąd rejestracji', error: err.message });
  }
};

// Funkcja odpowiedzialna za logowanie użytkownika
const login = async (req, res) => {
  // Pobranie emaila i hasła z body żądania
  const { email, password } = req.body;

  try {
    // Wyszukanie użytkownika w bazie po adresie email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // Pobranie pierwszego znalezionego użytkownika
    const user = result.rows[0];

    // Jeśli użytkownik nie istnieje, zwracany jest błąd 404
    if (!user) return res.status(404).json({ message: 'Użytkownik nie istnieje' });

    // Porównanie wpisanego hasła z hasłem zapisanym w bazie
    const valid = await bcrypt.compare(password, user.password);

    // Jeśli hasło jest niepoprawne, zwracany jest błąd 401
    if (!valid) return res.status(401).json({ message: 'Złe hasło' });

    // Utworzenie tokena JWT zawierającego id i rolę użytkownika
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET, // Sekretny klucz z pliku .env
        { expiresIn: '24h' } // Token ważny przez 24 godziny
    );

    // Zwrócenie tokena oraz roli użytkownika
    res.json({ token, role: user.role });
  } catch (err) {
    // Obsługa błędów podczas logowania
    res.status(500).json({ message: 'Błąd logowania', error: err.message });
  }
};

// Eksport funkcji do wykorzystania w trasach aplikacji
module.exports = { register, login };