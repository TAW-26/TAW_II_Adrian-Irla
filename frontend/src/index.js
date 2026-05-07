// Odpowiada za podłączenie głównego komponentu App do DOM
// oraz uruchomienie całej aplikacji w przeglądarce

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Tworzenie root'a React (punkt zaczepienia aplikacji w HTML)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderowanie aplikacji do elementu o id="root" w index.html
root.render(
    <React.StrictMode>
        {/* StrictMode pomaga wykrywać potencjalne błędy w aplikacji w czasie developmentu */}
        <App />
    </React.StrictMode>
);
