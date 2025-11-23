@echo off
echo Starting Backend Server...
echo.
cd backend
echo Seeding database (first time only)...
node seeder.js
echo.
echo Starting backend on http://localhost:5000
npm run dev
pause

