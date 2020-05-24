pushd "%~dp0\essentials"
call npm publish
popd
if errorlevel 1 goto :error

pushd "%~dp0\ng-workspace\dist\angular"
call npm publish
popd
if errorlevel 1 goto :error

goto :eof

:error
echo "publish failed"
exit /B 1
