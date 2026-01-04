# Casino Games Platform

A full-stack Mini Sports/Casino Games Platform where users can log in, view games/matches, filter them, and mark favorites.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## 📋 Features

✅ User authentication (Register/Login with JWT)
✅ Password hashing with bcrypt
✅ List of sports matches/games
✅ Filter by sport (Cricket, Football, Tennis)
✅ Mark/unmark favorites
✅ View favorites section
✅ Protected routes
✅ Responsive design
✅ Loading states
✅ Error handling

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/casino_db"
JWT_SECRET="your_super_secret_jwt_key"
PORT=5000
```

5. Create the database:
```bash
# Using psql
psql -U postgres
CREATE DATABASE casino_db;
\q
```

6. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

7. Seed the database:
```bash
npm run seed
```

8. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
  - Body: `{ name, email, password }`
  
- `POST /auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

### Games (Protected)
- `GET /games` - Get all games
  - Query: `?sport=Cricket` (optional filter)
  - Returns: Array of games with favorite status
  
### Favorites (Protected)
- `POST /favorites/:gameId` - Toggle favorite
  - Returns: `{ added: true }` or `{ removed: true }`
  
- `GET /favorites` - Get user's favorite games
  - Returns: Array of favorite games

## 🗄️ Database Schema

### User
- id (Integer, Primary Key)
- name (String)
- email (String, Unique)
- password (String, Hashed)

### Game
- id (Integer, Primary Key)
- name (String)
- sport (String)
- league (String)

### Favorite
- id (Integer, Primary Key)
- userId (Integer, Foreign Key)
- gameId (Integer, Foreign Key)
- Unique constraint on (userId, gameId)

## 📝 Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Login with your credentials to receive a JWT token
3. **Browse Games**: View all available sports matches/games
4. **Filter**: Filter games by sport (Cricket, Football, Tennis)
5. **Add Favorites**: Click the star icon to mark games as favorites
6. **View Favorites**: Click "Favorites Only" to see your favorite games

## 🧪 Testing the Application

1. Register a new user
2. Login with the credentials
3. You should see seeded games (MI vs CSK, Real vs Barca, etc.)
4. Try filtering by different sports
5. Add games to favorites by clicking the star
6. Toggle "Favorites Only" to see your favorites

## 🔒 Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens for authentication
- Protected routes on both frontend and backend
- Token expiry (7 days)
- Input validation on both client and server

## 📦 Project Structure

```
casino/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## 🚀 Deployment

### Backend
- Can be deployed on Render, Railway, or Heroku
- Set environment variables in the platform
- Run migrations after deployment

### Frontend
- Can be deployed on Vercel or Netlify
- Update API base URL in `src/api/api.js`

## 👨‍💻 Developer

Built as part of the Full-Stack Intern Assessment for Sports/Casino Mini Platform.

## 📄 License

This project is created for assessment purposes.
