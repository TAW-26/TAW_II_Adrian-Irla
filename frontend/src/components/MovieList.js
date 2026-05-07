// ==========================================================
// Odpowiedzialny za wyświetlanie listy filmów.
// Umożliwia użytkownikowi przeglądanie wszystkich filmów,
// zarządzanie własną listą (dodawanie, usuwanie, zmiana statusu i oceny),
// a także (dla admina) przełączanie do panelu administracyjnego.
// ==========================================================

import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';

function MovieList({ token, role, onLogout }) {
  // Lista wszystkich filmów dostępnych w systemie
  const [movies, setMovies] = useState([]);

  // Lista filmów przypisanych do zalogowanego użytkownika
  const [userMovies, setUserMovies] = useState([]);

  // Komunikaty błędów (np. problem z API)
  const [error, setError] = useState('');

  // Stan ładowania danych
  const [loading, setLoading] = useState(true);

  // Czy pokazać panel admina (jeśli użytkownik ma rolę admin)
  const [showAdmin, setShowAdmin] = useState(false);

  // Nagłówki do zapytań API (autoryzacja JWT)
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Pobranie wszystkich filmów z API
  const fetchMovies = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/movies', { headers });
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError('Błąd pobierania filmów');
    } finally {
      setLoading(false);
    }
  };

  // Pobranie filmów przypisanych do użytkownika
  const fetchUserMovies = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user-movies', { headers });
      const data = await res.json();
      setUserMovies(data);
    } catch (err) {
      setError('Błąd pobierania listy');
    }
  };

  // Uruchamiane przy pierwszym renderze komponentu
  useEffect(() => {
    fetchMovies();
    fetchUserMovies();
  }, []);

  // Dodanie filmu do listy użytkownika
  const addToList = async (movieId) => {
    try {
      await fetch('http://localhost:3000/api/user-movies', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          movie_id: movieId,
          status: 'chce_obejrzec'
        }),
      });
      fetchUserMovies(); // odświeżenie listy
    } catch (err) {
      setError('Błąd dodawania do listy');
    }
  };

  // Aktualizacja statusu filmu (np. obejrzane / chce obejrzeć) oraz oceny
  const updateStatus = async (id, status, rating) => {
    try {
      await fetch(`http://localhost:3000/api/user-movies/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status, rating }),
      });
      fetchUserMovies(); // odświeżenie danych
    } catch (err) {
      setError('Błąd aktualizacji');
    }
  };

  // Usunięcie filmu z listy użytkownika
  const removeFromList = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/user-movies/${id}`, {
        method: 'DELETE',
        headers
      });
      fetchUserMovies();
    } catch (err) {
      setError('Błąd usuwania');
    }
  };

  // Ekran ładowania danych
  if (loading) return <p style={{ textAlign: 'center', marginTop: 100 }}>Ładowanie...</p>;

  return (
      <div style={{ maxWidth: 900, margin: '20px auto', padding: 20 }}>

        {/* Nagłówek + przyciski (admin / logout) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Moja lista filmów</h2>
          <div>
            {/* Przycisk panelu admina widoczny tylko dla admina */}
            {role === 'admin' && (
                <button
                    onClick={() => setShowAdmin(!showAdmin)}
                    style={{ marginRight: 10, padding: '8px 16px' }}
                >
                  {showAdmin ? 'Moja lista' : 'Panel admina'}
                </button>
            )}

            {/* Wylogowanie */}
            <button onClick={onLogout} style={{ padding: '8px 16px' }}>
              Wyloguj
            </button>
          </div>
        </div>

        {/* Wyświetlanie błędów */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Warunek: panel admina lub lista użytkownika */}
        {showAdmin ? (
            <AdminPanel token={token} headers={headers} onRefresh={fetchMovies} />
        ) : (
            <>
              {/* ================== MOJA LISTA ================== */}
              <h3>Moja lista</h3>

              {/* Gdy brak filmów */}
              {userMovies.length === 0 && <p>Brak filmów na liście.</p>}

              {/* Lista filmów użytkownika */}
              {userMovies.map(um => (
                  <div
                      key={um.id}
                      style={{
                        border: '1px solid #ccc',
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 6
                      }}
                  >
                    <strong>{um.title}</strong> — {um.genre} ({um.type})

                    <br />

                    {/* Zmiana statusu filmu */}
                    Status:
                    <select
                        value={um.status}
                        onChange={e => updateStatus(um.id, e.target.value, um.rating)}
                    >
                      <option value="chce_obejrzec">Chcę obejrzeć</option>
                      <option value="obejrzane">Obejrzane</option>
                    </select>

                    {/* Ocena filmu */}
                    &nbsp; Ocena:
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={um.rating || ''}
                        style={{ width: 50 }}
                        onChange={e => updateStatus(um.id, um.status, e.target.value)}
                    />

                    {/* Link do trailera jeśli istnieje */}
                    {um.trailer_url && (
                        <>
                          &nbsp;
                          <a href={um.trailer_url} target="_blank" rel="noreferrer">
                            Trailer
                          </a>
                        </>
                    )}

                    {/* Usunięcie filmu z listy */}
                    &nbsp;
                    <button onClick={() => removeFromList(um.id)}>Usuń</button>
                  </div>
              ))}

              {/* ================== WSZYSTKIE FILMY ================== */}
              <h3>Wszystkie filmy</h3>

              {movies.map(m => (
                  <div
                      key={m.id}
                      style={{
                        border: '1px solid #eee',
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 6
                      }}
                  >
                    <strong>{m.title}</strong> — {m.genre} ({m.type})

                    &nbsp;
                    {/* Dodanie filmu do listy użytkownika */}
                    <button onClick={() => addToList(m.id)}>
                      + Dodaj do listy
                    </button>
                  </div>
              ))}
            </>
        )}
      </div>
  );
}

export default MovieList;