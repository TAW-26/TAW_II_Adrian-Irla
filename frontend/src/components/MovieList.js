import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';

function MovieList({ token, role, onLogout }) {
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

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

  const fetchUserMovies = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user-movies', { headers });
      const data = await res.json();
      setUserMovies(data);
    } catch (err) {
      setError('Błąd pobierania listy');
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchUserMovies();
  }, []);

  const addToList = async (movieId) => {
    try {
      await fetch('http://localhost:3000/api/user-movies', {
        method: 'POST',
        headers,
        body: JSON.stringify({ movie_id: movieId, status: 'chce_obejrzec' }),
      });
      fetchUserMovies();
    } catch (err) {
      setError('Błąd dodawania do listy');
    }
  };

  const updateStatus = async (id, status, rating) => {
    try {
      await fetch(`http://localhost:3000/api/user-movies/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status, rating }),
      });
      fetchUserMovies();
    } catch (err) {
      setError('Błąd aktualizacji');
    }
  };

  const removeFromList = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/user-movies/${id}`, { method: 'DELETE', headers });
      fetchUserMovies();
    } catch (err) {
      setError('Błąd usuwania');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: 100 }}>Ładowanie...</p>;

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Moja lista filmów</h2>
        <div>
          {role === 'admin' && (
            <button onClick={() => setShowAdmin(!showAdmin)} style={{ marginRight: 10, padding: '8px 16px' }}>
              {showAdmin ? 'Moja lista' : 'Panel admina'}
            </button>
          )}
          <button onClick={onLogout} style={{ padding: '8px 16px' }}>Wyloguj</button>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showAdmin ? (
        <AdminPanel token={token} headers={headers} onRefresh={fetchMovies} />
      ) : (
        <>
          <h3>Moja lista</h3>
          {userMovies.length === 0 && <p>Brak filmów na liście.</p>}
          {userMovies.map(um => (
            <div key={um.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, borderRadius: 6 }}>
              <strong>{um.title}</strong> — {um.genre} ({um.type})
              <br />
              Status: <select value={um.status} onChange={e => updateStatus(um.id, e.target.value, um.rating)}>
                <option value="chce_obejrzec">Chcę obejrzeć</option>
                <option value="obejrzane">Obejrzane</option>
              </select>
              &nbsp; Ocena: <input type="number" min="1" max="10" value={um.rating || ''} style={{ width: 50 }}
                onChange={e => updateStatus(um.id, um.status, e.target.value)} />
              {um.trailer_url && <> &nbsp; <a href={um.trailer_url} target="_blank" rel="noreferrer">Trailer</a></>}
              &nbsp; <button onClick={() => removeFromList(um.id)}>Usuń</button>
            </div>
          ))}

          <h3>Wszystkie filmy</h3>
          {movies.map(m => (
            <div key={m.id} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10, borderRadius: 6 }}>
              <strong>{m.title}</strong> — {m.genre} ({m.type})
              &nbsp; <button onClick={() => addToList(m.id)}>+ Dodaj do listy</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MovieList;