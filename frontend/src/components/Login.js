import React, { useState } from 'react';

function Login({ onLogin, onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            onLogin(data.token, data.role);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
            <h2>Logowanie</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email}
                       onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
                <input type="password" placeholder="Hasło" value={password}
                       onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
                <button type="submit" style={{ width: '100%', padding: 10 }}>Zaloguj</button>
            </form>
            <p>Nie masz konta? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onSwitch}>Zarejestruj się</span></p>
        </div>
    );
}

export default Login;