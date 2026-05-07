// ======================================================
// Odpowiada za panel administratora aplikacji.
// Umożliwia:
// - pobieranie listy filmów z API
// - dodawanie nowych filmów i seriali
// - edytowanie istniejących pozycji
// - usuwanie filmów
// - odświeżanie danych po zmianach
// ======================================================

import React, { useState, useEffect } from 'react';

function AdminPanel({ token, headers, onRefresh }) {
    // lista filmów pobranych z backendu
    const [movies, setMovies] = useState([]);

    // stan formularza dodawania/edycji filmu
    const [form, setForm] = useState({
        title: '',
        genre: '',
        type: 'film',
        trailer_url: ''
    });

    // ID filmu aktualnie edytowanego (jeśli null → dodawanie nowego)
    const [editId, setEditId] = useState(null);

    // komunikaty błędów
    const [error, setError] = useState('');

    // ======================================================
    // Pobieranie filmów z API
    // ======================================================
    const fetchMovies = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/movies', { headers });
            const data = await res.json();
            setMovies(data);
        } catch (err) {
            setError('Błąd pobierania filmów');
        }
    };

    // pobranie filmów przy pierwszym renderze komponentu
    useEffect(() => { fetchMovies(); }, []);

    // ======================================================
    // Dodawanie lub aktualizacja filmu
    // ======================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // jeśli editId istnieje → aktualizacja (PUT), w przeciwnym razie dodanie (POST)
            const url = editId
                ? `http://localhost:3000/api/movies/${editId}`
                : 'http://localhost:3000/api/movies';

            const method = editId ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                headers,
                body: JSON.stringify(form)
            });

            // reset formularza po zapisaniu
            setForm({ title: '', genre: '', type: 'film', trailer_url: '' });
            setEditId(null);

            // odświeżenie danych
            fetchMovies();
            onRefresh();

        } catch (err) {
            setError('Błąd zapisywania');
        }
    };

    // ======================================================
    // Włączenie trybu edycji dla wybranego filmu
    // ======================================================
    const handleEdit = (movie) => {
        setEditId(movie.id);
        setForm({
            title: movie.title,
            genre: movie.genre,
            type: movie.type,
            trailer_url: movie.trailer_url || ''
        });
    };

    // ======================================================
    // Usuwanie filmu
    // ======================================================
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/movies/${id}`, {
                method: 'DELETE',
                headers
            });

            fetchMovies();
            onRefresh();

        } catch (err) {
            setError('Błąd usuwania');
        }
    };

    return (
        <div>
            <h3>Panel administratora</h3>

            {/* komunikat błędu */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* formularz dodawania / edycji filmu */}
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>

                {/* tytuł filmu */}
                <input
                    type="text"
                    placeholder="Tytuł"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
                />

                {/* gatunek filmu */}
                <input
                    type="text"
                    placeholder="Gatunek"
                    value={form.genre}
                    onChange={e => setForm({ ...form, genre: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
                />

                {/* wybór typu: film lub serial */}
                <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
                >
                    <option value="film">Film</option>
                    <option value="serial">Serial</option>
                </select>

                {/* link do trailera */}
                <input
                    type="text"
                    placeholder="Link do trailera"
                    value={form.trailer_url}
                    onChange={e => setForm({ ...form, trailer_url: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
                />

                {/* przycisk zapisu */}
                <button type="submit" style={{ padding: '8px 16px' }}>
                    {editId ? 'Zapisz zmiany' : 'Dodaj film'}
                </button>

                {/* anulowanie edycji */}
                {editId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setForm({ title: '', genre: '', type: 'film', trailer_url: '' });
                        }}
                        style={{ padding: '8px 16px', marginLeft: 10 }}
                    >
                        Anuluj
                    </button>
                )}
            </form>

            {/* lista filmów */}
            {movies.map(m => (
                <div
                    key={m.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 6
                    }}
                >
                    <strong>{m.title}</strong> — {m.genre} ({m.type})

                    {/* przyciski akcji */}
                    &nbsp; <button onClick={() => handleEdit(m)}>Edytuj</button>
                    &nbsp; <button onClick={() => handleDelete(m.id)}>Usuń</button>
                </div>
            ))}
        </div>
    );
}

export default AdminPanel;