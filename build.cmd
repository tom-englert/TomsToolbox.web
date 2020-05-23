rd essentials/dist /s /q
del essentials/tsconfig.tsbuildinfo
call npm --prefix essentials run build
if errorlevel 1 goto :error

call npm --prefix ng-workspace run build angular
if errorlevel 1 goto :error

goto :eof

:error
echo "build failed"
exit /B 1
