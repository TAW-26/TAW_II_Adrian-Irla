// Odpowiada za autoryzację użytkowników w aplikacji.
// Sprawdza poprawność tokenu JWT oraz kontroluje dostęp do zasobów (np. tylko admin).

const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware: verifyToken
 * Sprawdza czy użytkownik przesłał poprawny token JWT w nagłówku Authorization.
 * Jeśli token jest poprawny – dodaje dane użytkownika do req.user i przepuszcza dalej.
 * Jeśli nie – zwraca błąd 401 (brak autoryzacji).
 */
const verifyToken = (req, res, next) => {
  // Pobranie tokenu z nagłówka Authorization (format: Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1];

  // Jeśli brak tokenu – odrzucamy żądanie
  if (!token) return res.status(401).json({ message: 'Brak tokenu' });

  try {
    // Weryfikacja tokenu za pomocą sekretu z pliku .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Zapisanie danych użytkownika z tokenu do requestu
    req.user = decoded;

    // Przejście do następnego middleware lub kontrolera
    next();
  } catch (err) {
    // Jeśli token jest nieprawidłowy lub wygasł
    return res.status(401).json({ message: 'Nieprawidłowy token' });
  }
};

/**
 * Middleware: verifyAdmin
 * Sprawdza czy zalogowany użytkownik ma rolę admina.
 * Wymaga wcześniejszego użycia verifyToken (bo potrzebuje req.user).
 * Jeśli użytkownik nie jest adminem – blokuje dostęp (403).
 */
const verifyAdmin = (req, res, next) => {
  // Sprawdzenie roli użytkownika
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Brak uprawnień' });
  }

  // Jeśli admin – pozwól przejść dalej
  next();
};

// Eksport middleware do użycia w innych częściach aplikacji
module.exports = { verifyToken, verifyAdmin };