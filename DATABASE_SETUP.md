# Database Setup Instructions

## Prerequisites Check

Before starting, verify PostgreSQL is installed:
```bash
psql --version
```

If not installed, follow the installation guide in QUICK_START.md

## Method 1: Using psql Command Line

### Windows

1. Open Command Prompt or PowerShell as Administrator
2. Navigate to PostgreSQL bin folder (usually):
```bash
cd "C:\Program Files\PostgreSQL\15\bin"
```

3. Connect to PostgreSQL:
```bash
psql -U postgres
```

4. Enter your PostgreSQL password

5. Create the database:
```sql
CREATE DATABASE casino_db;
```

6. Verify database was created:
```sql
\l
```

7. Exit psql:
```sql
\q
```

### Alternative: Create database automatically with Prisma

If you don't want to manually create the database, Prisma can do it:

1. Update your `.env` file:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/casino_db"
```

2. Run migrations (this will create the database if it doesn't exist):
```bash
cd backend
npx prisma migrate dev --name init
```

## Method 2: Using pgAdmin (GUI)

1. Open pgAdmin (installed with PostgreSQL)
2. Connect to your PostgreSQL server
3. Right-click on "Databases"
4. Select "Create" > "Database"
5. Enter name: `casino_db`
6. Click "Save"

## Method 3: Using Docker

If you prefer Docker:

```bash
# Pull and run PostgreSQL
docker run --name casino-postgres \
  -e POSTGRES_DB=casino_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15

# Verify it's running
docker ps

# To stop
docker stop casino-postgres

# To start again
docker start casino-postgres
```

Update your `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/casino_db"
```

## After Database is Created

1. Navigate to backend folder:
```bash
cd backend
```

2. Generate Prisma Client:
```bash
npx prisma generate
```

3. Run migrations to create tables:
```bash
npx prisma migrate dev --name init
```

You should see output like:
```
✔ Generated Prisma Client
✔ Created 3 migrations:
  20240101000000_init
✔ Applied 3 migrations
```

4. Seed the database with sample data:
```bash
npm run seed
```

You should see:
```
✅ Seeded games successfully
```

5. Verify the data (optional):
```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555 where you can view your data.

## Troubleshooting

### Error: Can't reach database server

**Cause:** PostgreSQL is not running

**Solution:**
```bash
# Windows - Check PostgreSQL service
services.msc
# Look for "postgresql-x64-15" and start it

# Or using command line:
net start postgresql-x64-15
```

### Error: password authentication failed

**Cause:** Wrong password in DATABASE_URL

**Solution:**
1. Reset PostgreSQL password:
```bash
psql -U postgres
\password postgres
# Enter new password twice
```

2. Update `.env` file with new password

### Error: database "casino_db" does not exist

**Cause:** Database not created

**Solution:** Follow Method 1 or Method 2 above to create the database

### Error: Port 5432 already in use

**Cause:** Another PostgreSQL instance is running

**Solution:**
1. Find the process:
```bash
netstat -ano | findstr :5432
```

2. Kill the process or change the port in DATABASE_URL:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5433/casino_db"
```

### Error: Migration failed

**Solution:** Reset the database:
```bash
npx prisma migrate reset
```
⚠️ This will delete all data!

## Verifying Setup

After setup is complete, verify everything works:

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. You should see:
```
Server running on port 5000
```

3. Test the API:
```bash
curl http://localhost:5000
```

Expected response:
```json
{"message": "Casino API is running"}
```

## Common PostgreSQL Commands

```sql
-- List all databases
\l

-- Connect to a database
\c casino_db

-- List all tables
\dt

-- View table structure
\d users
\d games
\d favorites

-- Query data
SELECT * FROM games;
SELECT * FROM users;

-- Delete a database (careful!)
DROP DATABASE casino_db;

-- Exit
\q
```

## Need Help?

If you're still having issues:

1. Check PostgreSQL logs:
   - Windows: `C:\Program Files\PostgreSQL\15\data\pg_log`

2. Verify PostgreSQL is running:
```bash
pg_isready
```

3. Check connection string format:
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

4. Try connecting with psql to verify credentials:
```bash
psql -U postgres -d casino_db
```
