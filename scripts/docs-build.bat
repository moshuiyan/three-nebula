@echo off
set ESDOC=esdoc esdoc-ecmascript-proposal-plugin esdoc-standard-plugin

@REM npm i %ESDOC% -D && .\node_modules\.bin\esdoc && npm uninstall %ESDOC% -D
call npm i %ESDOC% -D
call ..\node_modules\.bin\esdoc
@REM call npm uninstall %ESDOC% -D