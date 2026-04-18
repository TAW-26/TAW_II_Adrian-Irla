import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import MovieList from './components/MovieList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setToken(token);
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  if (!token) {
    return showRegister
        ? <Register onSwitch={() => setShowRegister(false)} />
        : <Login onLogin={handleLogin} onSwitch={() => setShowRegister(true)} />;
  }

  return <MovieList token={token} role={role} onLogout={handleLogout} />;
}

export default App;