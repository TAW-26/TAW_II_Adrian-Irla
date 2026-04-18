import React, { useState } from 'react';

function Register({ onSwitch }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setSuccess('Rejestracja udana! Możesz się zalogować.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
            <h2>Rejestracja</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nazwa użytkownika" value={username}
                       onChange={e => setUsername(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
                <input type="email" placeholder="Email" value={email}
                       onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
                <input type="password" placeholder="Hasło" value={password}
                       onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
                <button type="submit" style={{ width: '100%', padding: 10 }}>Zarejestruj</button>
            </form>
            <p>Masz już konto? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onSwitch}>Zaloguj się</span></p>
        </div>
    );
}

export default Register;