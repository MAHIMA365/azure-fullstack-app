@echo off
echo Starting Azure Fullstack Shopping Cart App...

echo.
echo Starting Backend API...
start "Backend API" cmd /k "cd /d azure-fullstack-app\backend\ShoppingCartAPI && dotnet run"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend...
start "Frontend" cmd /k "cd /d azure-fullstack-app\frontend\shoppingcart && npm run dev"

echo.
echo Both services are starting...
echo Backend API: https://localhost:7001
echo Frontend: http://localhost:5173
echo.
pause