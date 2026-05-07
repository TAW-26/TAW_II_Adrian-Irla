// Odpowiada za wyświetlanie formularza rejestracji użytkownika,
// obsługę danych wpisywanych przez użytkownika oraz wysyłanie
// żądania do backendu w celu utworzenia nowego konta.

import React, { useState } from 'react';

function Register({ onSwitch }) {
    // Stan przechowujący nazwę użytkownika wpisaną w formularzu
    const [username, setUsername] = useState('');

    // Stan przechowujący email użytkownika
    const [email, setEmail] = useState('');

    // Stan przechowujący hasło użytkownika
    const [password, setPassword] = useState('');

    // Stan przechowujący komunikat błędu (np. nieudana rejestracja)
    const [error, setError] = useState('');

    // Stan przechowujący komunikat sukcesu (np. poprawna rejestracja)
    const [success, setSuccess] = useState('');

    // Funkcja obsługująca wysłanie formularza rejestracji
    const handleSubmit = async (e) => {
        e.preventDefault(); // blokuje domyślne odświeżenie strony

        try {
            // Wysłanie danych rejestracyjnych do API backendu
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            // Odczytanie odpowiedzi z serwera
            const data = await res.json();

            // Jeśli odpowiedź nie jest poprawna, wyrzucamy błąd
            if (!res.ok) throw new Error(data.message);

            // Ustawienie komunikatu sukcesu po udanej rejestracji
            setSuccess('Rejestracja udana! Możesz się zalogować.');
        } catch (err) {
            // Ustawienie komunikatu błędu w przypadku problemu
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
            <h2>Rejestracja</h2>

            {/* Wyświetlenie błędu, jeśli wystąpił */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Wyświetlenie komunikatu sukcesu */}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {/* Formularz rejestracji */}
            <form onSubmit={handleSubmit}>
                {/* Pole na nazwę użytkownika */}
                <input
                    type="text"
                    placeholder="Nazwa użytkownika"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
                />

                {/* Pole na email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
                />

                {/* Pole na hasło */}
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
                />

                {/* Przycisk wysyłający formularz */}
                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    Zarejestruj
                </button>
            </form>

            {/* Przełączenie na ekran logowania */}
            <p>
                Masz już konto?{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={onSwitch}
                >
                    Zaloguj się
                </span>
            </p>
        </div>
    );
}

export default Register;