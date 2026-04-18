# Projekt interfejsu użytkownika

## Główne widoki

### 1. Strona logowania / rejestracji
- Formularz z polami: email, hasło (logowanie)
- Formularz z polami: nazwa użytkownika, email, hasło (rejestracja)
- Przycisk przełączania między logowaniem a rejestracją

### 2. Strona główna (lista filmów)
- Nagłówek z nazwą aplikacji i przyciskiem wylogowania
- Pole wyszukiwania i filtrowania (po gatunku, typie, statusie)
- Siatka kart filmów — każda karta zawiera:
  - Tytuł
  - Gatunek
  - Typ (film / serial)
  - Status (Chcę obejrzeć / Obejrzane)
  - Ocena (1–10)
  - Link do trailera
  - Przyciski: zmień status, oceń, usuń z listy

### 3. Widok dodawania filmu do listy
- Lista wszystkich dostępnych filmów z bazy
- Przycisk "Dodaj do mojej listy" przy każdym filmie

### 4. Panel administratora
- Tabela wszystkich filmów w bazie
- Przyciski: Dodaj film, Edytuj, Usuń
- Formularz dodawania/edytowania filmu:
  - Tytuł
  - Gatunek
  - Typ (film / serial)
  - Link do trailera

## Nawigacja
- Użytkownik niezalogowany: widzi tylko stronę logowania/rejestracji
- Użytkownik zalogowany: widzi swoją listę filmów
- Administrator: widzi dodatkowo panel zarządzania filmami

## Technologia
- React — komponenty funkcyjne
- CSS — stylowanie komponentów
- fetch API — komunikacja z backendem
