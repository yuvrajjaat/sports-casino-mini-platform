# Quick Start Guide

## Step 1: Install PostgreSQL

### Option 1: Using Official PostgreSQL Installer (Recommended)
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Set password for postgres user (remember this!)
4. Default port: 5432 (keep it)
5. Complete the installation

### Option 2: Using Docker (Alternative)
```bash
docker run --name casino-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

## Step 2: Setup Backend

1. Open Terminal in VSCode
2. Navigate to backend:
```bash
cd backend
```

3. Install dependencies (already done):
```bash
npm install
```

4. Update `.env` file with your PostgreSQL password:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/casino_db"
JWT_SECRET="your_super_secret_jwt_key_change_in_production_123456"
PORT=5000
```

5. Create database and run migrations:
```bash
npx prisma migrate dev --name init
```

6. Seed the database:
```bash
npm run seed
```

7. Start the backend server:
```bash
npm run dev
```
✅ Backend should now be running on http://localhost:5000

## Step 3: Setup Frontend

1. Open a NEW terminal
2. Navigate to frontend:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the frontend:
```bash
npm run dev
```
✅ Frontend should now be running on http://localhost:3000

## Step 4: Test the Application

1. Open browser and go to: http://localhost:3000
2. Click "Register" and create a new account
3. You'll be automatically logged in and see the games
4. Try filtering by sport
5. Click stars to add favorites
6. Click "Favorites Only" to see your favorites

## Troubleshooting

### PostgreSQL Connection Error
- Make sure PostgreSQL is running
- Check username/password in `.env`
- Verify port 5432 is not in use

### Port Already in Use
- Backend (5000): Change PORT in `.env`
- Frontend (3000): Change port in `vite.config.js`

### Prisma Errors
```bash
# Generate Prisma client
npx prisma generate

# Reset database (warning: deletes all data)
npx prisma migrate reset
```

## Common Commands

### Backend
```bash
npm run dev      # Start development server
npm run seed     # Seed database with sample data
npx prisma studio # Open database GUI
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```
