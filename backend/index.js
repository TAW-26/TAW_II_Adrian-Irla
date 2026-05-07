// =======================================================
// Odpowiada za uruchomienie serwera Express, konfigurację
// middleware (CORS, JSON), podpięcie tras API oraz start
// nasłuchiwania na wybranym porcie.
// =======================================================

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Wczytanie zmiennych środowiskowych z pliku .env

// Import tras (routing API)
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userMovieRoutes = require('./routes/userMovieRoutes');

const app = express();

// Middleware
app.use(cors()); // Umożliwia komunikację między frontendem a backendem (CORS)
app.use(express.json()); // Umożliwia odbieranie danych JSON w requestach

// Podpięcie endpointów API
app.use('/api/auth', authRoutes); // Autoryzacja (logowanie, rejestracja)
app.use('/api/movies', movieRoutes); // Operacje na filmach
app.use('/api/user-movies', userMovieRoutes); // Filmy przypisane do użytkownika

// Endpoint testowy – sprawdzenie czy serwer działa
app.get('/', (req, res) => {
  res.json({ message: 'API działa!' });
});

// Ustawienie portu z pliku .env lub domyślnie 3000
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).json({ message: 'Nie znaleziono zasobu' });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});