call npm --prefix essentials test
if errorlevel 1 goto :error

call npm --prefix ng-workspace run test-ci
if errorlevel 1 goto :error

goto :eof

:error
echo "test failed"
exit /B 1
