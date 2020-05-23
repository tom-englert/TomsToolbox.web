call npm --prefix essentials run doc
if errorlevel 1 goto :error

call npm --prefix ng-workspace run doc
if errorlevel 1 goto :error

goto :eof

:error
echo "documentation failed"
exit /B 1
