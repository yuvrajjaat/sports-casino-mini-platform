# API Documentation

Base URL: `http://localhost:5000`

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing fields or user already exists
- `500 Internal Server Error` - Server error

---

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials
- `500 Internal Server Error` - Server error

---

## Games Endpoints

⚠️ **All game endpoints require authentication**

**Authorization Header:**
```
Authorization: Bearer <your_jwt_token>
```

### Get All Games
```http
GET /games
```

**Query Parameters:**
- `sport` (optional) - Filter by sport name (e.g., "Cricket", "Football", "Tennis")

**Example Requests:**
```http
GET /games
GET /games?sport=Cricket
GET /games?sport=Football
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "MI vs CSK",
    "sport": "Cricket",
    "league": "IPL",
    "isFavorite": true
  },
  {
    "id": 2,
    "name": "Real Madrid vs Barcelona",
    "sport": "Football",
    "league": "La Liga",
    "isFavorite": false
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

## Favorites Endpoints

⚠️ **All favorite endpoints require authentication**

### Toggle Favorite
```http
POST /favorites/:gameId
```

**URL Parameters:**
- `gameId` - The ID of the game to toggle

**Example Request:**
```http
POST /favorites/1
```

**Success Response (200):**
```json
{
  "added": true,
  "message": "Added to favorites"
}
```
or
```json
{
  "removed": true,
  "message": "Removed from favorites"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### Remove Favorite
```http
DELETE /favorites/:gameId
```

**URL Parameters:**
- `gameId` - The ID of the game to remove

**Example Request:**
```http
DELETE /favorites/1
```

**Success Response (200):**
Same as Toggle Favorite

---

### Get User's Favorites
```http
GET /favorites
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "MI vs CSK",
    "sport": "Cricket",
    "league": "IPL",
    "isFavorite": true
  },
  {
    "id": 3,
    "name": "India vs Australia",
    "sport": "Cricket",
    "league": "Test Series",
    "isFavorite": true
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `500 Internal Server Error` - Server error

## Error Response Format

All error responses follow this format:
```json
{
  "message": "Error description here"
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Games (with token)
```bash
curl -X GET http://localhost:5000/games \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Add Favorite
```bash
curl -X POST http://localhost:5000/favorites/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Favorites
```bash
curl -X GET http://localhost:5000/favorites \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing with Postman

1. Create a new collection named "Casino API"
2. Set up an environment variable for the token
3. Create requests for each endpoint
4. Use Tests tab to automatically save token after login:
```javascript
pm.environment.set("token", pm.response.json().token);
```
5. Set Authorization header to `Bearer {{token}}`
