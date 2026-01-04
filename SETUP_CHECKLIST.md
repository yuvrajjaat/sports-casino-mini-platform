# Final Setup Checklist

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install PostgreSQL ⏱️ 2 minutes

**Choose ONE option:**

#### Option A: Already Have PostgreSQL?
- [ ] PostgreSQL is installed
- [ ] PostgreSQL service is running
- [ ] You know your password

#### Option B: Need to Install PostgreSQL?
Download: https://www.postgresql.org/download/windows/
- [ ] Download PostgreSQL installer
- [ ] Run installer (remember the password!)
- [ ] Keep default settings (port 5432)

#### Option C: Use Docker?
```bash
docker run --name casino-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
- [ ] Docker is installed
- [ ] Command executed successfully

---

### Step 2: Setup Backend ⏱️ 2 minutes

Open Terminal in VSCode (Ctrl + `), then:

```bash
# Navigate to backend
cd backend

# Already installed, but if needed:
# npm install

# Update .env with your PostgreSQL password
# Edit backend/.env file:
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/casino_db"

# Create database and tables
npx prisma migrate dev --name init

# Add sample games
npm run seed

# Start backend
npm run dev
```

**Checklist:**
- [ ] Dependencies installed
- [ ] `.env` file updated with correct password
- [ ] Migrations successful
- [ ] Seed script successful
- [ ] Backend running on http://localhost:5000

---

### Step 3: Setup Frontend ⏱️ 1 minute

Open a **NEW** terminal (Ctrl + Shift + `), then:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

**Checklist:**
- [ ] Dependencies installed
- [ ] Frontend running on http://localhost:3000
- [ ] No errors in terminal

---

### Step 4: Test Application ⏱️ 2 minutes

Open browser: http://localhost:3000

**Test Flow:**
1. [ ] Click "Register"
2. [ ] Fill form (Name, Email, Password)
3. [ ] Submit - should auto-login
4. [ ] See games list (12 games)
5. [ ] Click "Cricket" filter - see only cricket games
6. [ ] Click star icon - game marked as favorite
7. [ ] Click "Favorites Only" - see only favorites
8. [ ] Click star again - removed from favorites

**Success Criteria:**
- [ ] All 12 games visible
- [ ] Filters work correctly
- [ ] Favorites toggle works
- [ ] No errors in browser console

---

## 🐛 Troubleshooting

### Problem: "Can't reach database server"

**Solution:**
```bash
# Check if PostgreSQL is running
# Windows: Open services.msc, look for postgresql-x64-15
# Or run: net start postgresql-x64-15
```

### Problem: "npm install" fails

**Solution:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Port 5000 already in use"

**Solution:**
```bash
# Change backend port in .env:
PORT=5001
# Then update frontend API URL in src/api/api.js:
baseURL: "http://localhost:5001"
```

### Problem: "Migration failed"

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
cd backend
npx prisma migrate reset
npm run seed
```

### Problem: Frontend not connecting to backend

**Check:**
1. [ ] Backend is running on port 5000
2. [ ] No CORS errors in browser console
3. [ ] API URL is correct in `frontend/src/api/api.js`

---

## 📱 Testing Guide

### Manual Test Cases

#### Test 1: User Registration
1. Go to http://localhost:3000
2. Click "Register"
3. Enter: Name, Email, Password
4. Click "Register" button
5. ✅ Should redirect to games page

#### Test 2: User Login
1. Logout (if logged in)
2. Go to Login page
3. Enter: Email, Password
4. Click "Login" button
5. ✅ Should redirect to games page

#### Test 3: View All Games
1. Login
2. ✅ Should see 12 games
3. ✅ Games should have: name, sport, league, star icon

#### Test 4: Filter by Sport
1. Click "Cricket" filter
2. ✅ Should see only cricket games (4 games)
3. Click "Football" filter
4. ✅ Should see only football games (5 games)
5. Click "All Sports"
6. ✅ Should see all 12 games

#### Test 5: Add Favorite
1. Click star icon on any game
2. ✅ Star should become filled (⭐)
3. ✅ No errors in console

#### Test 6: View Favorites
1. Add 2-3 favorites
2. Click "Favorites Only" button
3. ✅ Should see only favorited games
4. Click "Favorites Only" again
5. ✅ Should see all games again

#### Test 7: Remove Favorite
1. Click filled star on favorite game
2. ✅ Star should become empty (☆)
3. In "Favorites Only" view
4. ✅ Game should disappear

#### Test 8: Protected Routes
1. Logout
2. Try to access http://localhost:3000/games
3. ✅ Should redirect to login page

#### Test 9: Logout
1. Click "Logout" button
2. ✅ Should redirect to login page
3. Try to go back
4. ✅ Should not be able to access games

---

## 🚀 Ready to Submit?

### Pre-Submission Checklist

#### Code Quality
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] No errors in browser console
- [ ] All files saved

#### Git Repository
- [ ] Git initialized (`git init`)
- [ ] All files added (`git add .`)
- [ ] Committed with message (`git commit -m "..."`)
- [ ] Pushed to GitHub
- [ ] README.md visible on GitHub

#### Documentation
- [ ] README.md is complete
- [ ] .env.example exists (not .env!)
- [ ] API_DOCUMENTATION.md exists
- [ ] Clear setup instructions

#### Testing
- [ ] Can register new user
- [ ] Can login
- [ ] Can see games
- [ ] Can filter by sport
- [ ] Can add/remove favorites
- [ ] Can view favorites only
- [ ] Can logout

#### Files to Check
- [ ] `.env` is NOT committed
- [ ] `node_modules` is NOT committed
- [ ] `.gitignore` files are present
- [ ] All source code is committed

---

## 📝 Submission Steps

1. **Create GitHub Repository**
   ```bash
   # In project root (casino folder)
   git init
   git add .
   git commit -m "feat: Complete casino games platform"
   
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/casino-platform.git
   git branch -M main
   git push -u origin main
   ```

2. **Verify Repository**
   - [ ] Visit your GitHub repo URL
   - [ ] README.md is displayed
   - [ ] All files are visible
   - [ ] .env is NOT visible (good!)

3. **Fill Submission Form**
   - [ ] Go to: https://forms.gle/8UYxeEwP3GdnfJtLA
   - [ ] Enter your details
   - [ ] Paste GitHub repository URL
   - [ ] Submit

---

## 🎉 You're Done!

Your full-stack casino platform is complete with:
- ✅ User authentication (JWT + bcrypt)
- ✅ 12 seeded games across 3 sports
- ✅ Filter by sport functionality
- ✅ Persistent favorites system
- ✅ Professional UI with dark theme
- ✅ Responsive design
- ✅ Complete documentation
- ✅ RESTful API
- ✅ PostgreSQL database

**Good luck with your assessment! 🚀**

---

## 📞 Need Help?

If you get stuck:

1. Check [QUICK_START.md](QUICK_START.md) for setup
2. Check [DATABASE_SETUP.md](DATABASE_SETUP.md) for database issues
3. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
4. Check browser console for errors (F12)
5. Check terminal output for error messages

Common commands:
```bash
# Backend logs
cd backend && npm run dev

# Frontend logs
cd frontend && npm run dev

# Database GUI
cd backend && npx prisma studio

# Reset database
cd backend && npx prisma migrate reset
```
