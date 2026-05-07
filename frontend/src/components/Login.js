// ==========================================================
// Odpowiedzialny za ekran logowania użytkownika.
// Umożliwia wprowadzenie emaila i hasła, wysyła dane do API
// oraz obsługuje logowanie (przekazanie tokena i roli użytkownika).
// ==========================================================

import React, { useState } from 'react';

function Login({ onLogin, onSwitch }) {
    // Stan przechowujący wpisany email użytkownika
    const [email, setEmail] = useState('');

    // Stan przechowujący wpisane hasło użytkownika
    const [password, setPassword] = useState('');

    // Stan przechowujący komunikat błędu (np. złe dane logowania)
    const [error, setError] = useState('');

    // Funkcja obsługująca wysłanie formularza logowania
    const handleSubmit = async (e) => {
        e.preventDefault(); // blokuje przeładowanie strony

        try {
            // Wysłanie danych logowania do backendu
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST', // metoda HTTP
                headers: { 'Content-Type': 'application/json' }, // informacja o JSON
                body: JSON.stringify({ email, password }), // dane użytkownika
            });

            // Odczyt odpowiedzi z serwera
            const data = await res.json();

            // Jeśli odpowiedź nie jest OK → wyrzucamy błąd
            if (!res.ok) throw new Error(data.message);

            // Jeśli logowanie się udało → przekazujemy token i rolę do aplikacji
            onLogin(data.token, data.role);

        } catch (err) {
            // W przypadku błędu ustawiamy komunikat dla użytkownika
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
            {/* Nagłówek formularza logowania */}
            <h2>Logowanie</h2>

            {/* Wyświetlanie błędu (jeśli wystąpił) */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Formularz logowania */}
            <form onSubmit={handleSubmit}>

                {/* Pole email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} // aktualizacja stanu email
                    style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
                />

                {/* Pole hasło */}
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={e => setPassword(e.target.value)} // aktualizacja stanu hasła
                    style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
                />

                {/* Przycisk logowania */}
                <button type="submit" style={{ width: '100%', padding: 10 }}>
                    Zaloguj
                </button>
            </form>

            {/* Link do przejścia do rejestracji */}
            <p>
                Nie masz konta?{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={onSwitch} // przełączenie na widok rejestracji
                >
                    Zarejestruj się
                </span>
            </p>
        </div>
    );
}

export default Login;