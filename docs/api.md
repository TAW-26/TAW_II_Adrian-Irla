# Dokumentacja API

## Auth

### POST /api/auth/register
**Body:**
```json
{
  "username": "adrian",
  "email": "adrian@test.com",
  "password": "haslo123"
}
```
**Response 201:**
```json
{
  "id": 1,
  "username": "adrian",
  "email": "adrian@test.com",
  "role": "user"
}
```

### POST /api/auth/login
**Body:**
```json
{
  "email": "adrian@test.com",
  "password": "haslo123"
}
```
**Response 200:**
```json
{
  "token": "eyJ...",
  "role": "user"
}
```

---

## Movies

### GET /api/movies
**Header:** `Authorization: Bearer <token>`

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "Inception",
    "genre": "sci-fi",
    "type": "film",
    "trailer_url": "https://youtube.com/..."
  }
]
```

### POST /api/movies (tylko admin)
**Header:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Inception",
  "genre": "sci-fi",
  "type": "film",
  "trailer_url": "https://youtube.com/..."
}
```
**Response 201:** zwraca dodany film

### PUT /api/movies/:id (tylko admin)
**Header:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Inception",
  "genre": "sci-fi",
  "type": "film",
  "trailer_url": "https://youtube.com/..."
}
```
**Response 200:** zwraca zaktualizowany film

### DELETE /api/movies/:id (tylko admin)
**Header:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "message": "Film usunięty"
}
```

---

## User Movies

### GET /api/user-movies
**Header:** `Authorization: Bearer <token>`

**Response 200:**
```json
[
  {
    "id": 1,
    "movie_id": 1,
    "title": "Inception",
    "status": "obejrzane",
    "rating": 9
  }
]
```

### POST /api/user-movies
**Header:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "movie_id": 1,
  "status": "chce_obejrzec"
}
```
**Response 201:** zwraca dodany wpis

### PUT /api/user-movies/:id
**Header:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "obejrzane",
  "rating": 8
}
```
**Response 200:** zwraca zaktualizowany wpis

### DELETE /api/user-movies/:id
**Header:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "message": "Usunięto z listy"
}
```
