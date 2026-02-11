@echo off
echo Installing dependencies for Bookstore Chatbot Frontend...
echo.

cd /d "%~dp0"

echo Step 1: Installing npm packages...
call npm install

echo.
echo Step 2: Verifying installation...
call npm list --depth=0

echo.
echo Installation complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
pause
