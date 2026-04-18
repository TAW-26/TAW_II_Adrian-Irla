import React, { useState, useEffect } from 'react';

function AdminPanel({ token, headers, onRefresh }) {
    const [movies, setMovies] = useState([]);
    const [form, setForm] = useState({ title: '', genre: '', type: 'film', trailer_url: '' });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    const fetchMovies = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/movies', { headers });
            const data = await res.json();
            setMovies(data);
        } catch (err) {
            setError('Błąd pobierania filmów');
        }
    };

    useEffect(() => { fetchMovies(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editId
                ? `http://localhost:3000/api/movies/${editId}`
                : 'http://localhost:3000/api/movies';
            const method = editId ? 'PUT' : 'POST';
            await fetch(url, { method, headers, body: JSON.stringify(form) });
            setForm({ title: '', genre: '', type: 'film', trailer_url: '' });
            setEditId(null);
            fetchMovies();
            onRefresh();
        } catch (err) {
            setError('Błąd zapisywania');
        }
    };

    const handleEdit = (movie) => {
        setEditId(movie.id);
        setForm({ title: movie.title, genre: movie.genre, type: movie.type, trailer_url: movie.trailer_url || '' });
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/movies/${id}`, { method: 'DELETE', headers });
            fetchMovies();
            onRefresh();
        } catch (err) {
            setError('Błąd usuwania');
        }
    };

    return (
        <div>
            <h3>Panel administratora</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input type="text" placeholder="Tytuł" value={form.title}
                       onChange={e => setForm({ ...form, title: e.target.value })}
                       style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }} />
                <input type="text" placeholder="Gatunek" value={form.genre}
                       onChange={e => setForm({ ...form, genre: e.target.value })}
                       style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }} />
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                        style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}>
                    <option value="film">Film</option>
                    <option value="serial">Serial</option>
                </select>
                <input type="text" placeholder="Link do trailera" value={form.trailer_url}
                       onChange={e => setForm({ ...form, trailer_url: e.target.value })}
                       style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }} />
                <button type="submit" style={{ padding: '8px 16px' }}>
                    {editId ? 'Zapisz zmiany' : 'Dodaj film'}
                </button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', genre: '', type: 'film', trailer_url: '' }); }}
                                   style={{ padding: '8px 16px', marginLeft: 10 }}>Anuluj</button>}
            </form>

            {movies.map(m => (
                <div key={m.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, borderRadius: 6 }}>
                    <strong>{m.title}</strong> — {m.genre} ({m.type})
                    &nbsp; <button onClick={() => handleEdit(m)}>Edytuj</button>
                    &nbsp; <button onClick={() => handleDelete(m.id)}>Usuń</button>
                </div>
            ))}
        </div>
    );
}

export default AdminPanel;