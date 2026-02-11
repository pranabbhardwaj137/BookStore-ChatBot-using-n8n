@echo off
echo Starting Bookstore Chatbot Frontend...
echo.

cd /d "%~dp0"

echo Starting Vite development server...
echo The app will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
