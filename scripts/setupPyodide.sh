#! bash
if [ "$(uname)" != "Darwin" ]; then
  echo "download and extract pyodide"
  curl -L -o .pyodide.tar.bz2 https://github.com/pyodide/pyodide/releases/download/0.22.1/pyodide-0.22.1.tar.bz2
  tar -jxf .pyodide.tar.bz2 -C public/
else
  echo "mac please install pyodide yourself"
fi
