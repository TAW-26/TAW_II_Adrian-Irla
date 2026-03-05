# Aplikacja do śledzenia filmów/seriali

## Opis wybranego tematu projektu

Aplikacja internetowa do śledzenia ulubionych filmów i seriali. Użytkownik może zarządzać własną listą tytułów, oznaczając je jako „Chcę obejrzeć" lub „Obejrzane". Każdy wpis zawiera tytuł, gatunek, ocenę oraz opcjonalny link do trailera. Administrator posiada rozszerzone uprawnienia do zarządzania bazą filmów dostępną dla wszystkich użytkowników.

## Cel projektu

Celem projektu jest stworzenie prostej i intuicyjnej aplikacji webowej umożliwiającej użytkownikom organizowanie swojej listy filmów i seriali do obejrzenia. Aplikacja ma ułatwić zarządzanie osobistą biblioteką multimedialną bez potrzeby korzystania z zewnętrznych serwisów.

## Zakres funkcjonalny

- Rejestracja i logowanie użytkowników (JWT)
- Podział na role: użytkownik i administrator
- Dodawanie filmów/seriali do osobistej listy
- Oznaczanie tytułów jako „Chcę obejrzeć" / „Obejrzane"
- Przypisywanie gatunku, oceny (1–10) i linku do trailera
- Przeglądanie i filtrowanie własnej listy
- Panel administratora: dodawanie, edytowanie i usuwanie filmów z globalnej bazy

## Proponowane technologie

| Warstwa       | Technologia              |
|---------------|--------------------------|
| Frontend      | React                    |
| Backend       | Node.js + Express        |
| Baza danych   | PostgreSQL               |
| Autentykacja  | JWT (JSON Web Token)     |
| IDE           | IntelliJ IDEA            |
| Wersjonowanie | Git + GitHub             |
