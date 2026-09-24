@echo off
chcp 65001 >nul
echo ========================================================
echo  Deploying Khung Sumpao Sub-District Municipality
echo  to GitHub Pages: https://taratakhameam-jpg.github.io/khungsumpao/
echo ========================================================
cd /d D:\khungsumpao
git push -u origin main -f
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] อัปเดตขึ้น GitHub Pages เรียบร้อยแล้ว!
    echo ตรวจสอบหน้าเว็บได้ที่: https://taratakhameam-jpg.github.io/khungsumpao/
) else (
    echo [ERROR] ไม่สามารถส่งข้อมูลขึ้น GitHub ได้ กรุณาเข้าสู่ระบบผ่านเบราว์เซอร์
)
echo.
pause
