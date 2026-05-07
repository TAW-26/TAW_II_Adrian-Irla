/*
  Odpowiada za zarządzanie logiką logowania użytkownika,
  przełączaniem między ekranem logowania i rejestracji
  oraz przekazywaniem danych (token, rola użytkownika)
  do dalszych komponentów aplikacji.
*/

import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import MovieList from './components/MovieList';

function App() {
  // Stan przechowujący token użytkownika (pobrany z localStorage)
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Stan przechowujący rolę użytkownika (np. admin/user)
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Stan określający, czy pokazać formularz rejestracji (true) czy logowania (false)
  const [showRegister, setShowRegister] = useState(false);

  /*
    Funkcja wywoływana po poprawnym zalogowaniu.
    Zapisuje token i rolę w localStorage oraz w stanie aplikacji.
  */
  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setToken(token);
    setRole(role);
  };

  /*
    Funkcja wylogowania użytkownika.
    Usuwa dane z localStorage i resetuje stan aplikacji.
  */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  /*
    Jeśli użytkownik NIE jest zalogowany (brak tokenu),
    wyświetlany jest ekran logowania lub rejestracji
    w zależności od stanu showRegister.
  */
  if (!token) {
    return showRegister
        ? <Register onSwitch={() => setShowRegister(false)} />
        : <Login onLogin={handleLogin} onSwitch={() => setShowRegister(true)} />;
  }

  /*
    Jeśli użytkownik jest zalogowany,
    wyświetlana jest lista filmów (MovieList),
    wraz z tokenem, rolą i możliwością wylogowania.
  */
  return <MovieList token={token} role={role} onLogout={handleLogout} />;
}

export default App;