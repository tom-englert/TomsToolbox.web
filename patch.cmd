pushd "%~dp0\essentials"
call npm version patch
popd
if errorlevel 1 goto :error

pushd "%~dp0\ng-workspace\projects\angular"
call npm version patch
popd
if errorlevel 1 goto :error

goto :eof

:error
echo "publish failed"
exit /B 1
