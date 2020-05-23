call npm --prefix essentials run build-ci
if errorlevel 1 goto :error

call npm --prefix ng-workspace run build angular
if errorlevel 1 goto :error

goto :eof

:error
echo "build failed"
exit /B 1
