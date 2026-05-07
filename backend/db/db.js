// Odpowiada za konfigurację i połączenie z bazą danych PostgreSQL.
// Tworzy pulę połączeń (connection pool), która umożliwia wykonywanie zapytań
// do bazy danych w całej aplikacji backendowej.

const { Pool } = require('pg');
require('dotenv').config();

// Tworzenie puli połączeń do PostgreSQL z wykorzystaniem zmiennych środowiskowych
const pool = new Pool({
  host: process.env.DB_HOST,         // adres hosta bazy danych
  port: process.env.DB_PORT,         // port bazy danych (domyślnie 5432)
  user: process.env.DB_USER,         // użytkownik bazy danych
  password: process.env.DB_PASSWORD, // hasło do bazy danych
  database: process.env.DB_NAME,     // nazwa bazy danych
});

// Udostępnienie puli połączeń w innych częściach aplikacji
module.exports = pool;