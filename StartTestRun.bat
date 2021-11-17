@echo off
set CUSTOM_CHROME_DRIVER=%cd%\webdrivers\chromedriver
set CUSTOM_EDGE_DRIVER=%cd%\webdrivers\msedgedriver

if exist %CUSTOM_CHROME_DRIVER%\chromedriver.exe set PATH=%CUSTOM_CHROME_DRIVER%;%PATH%
if exist %CUSTOM_EDGE_DRIVER%\msedgedriver.exe set PATH=%CUSTOM_EDGE_DRIVER%;%PATH%

set BROWSER_EXECUTION_MODE=%2

@echo on
yarn start:%1