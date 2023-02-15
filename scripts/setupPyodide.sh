#! bash
if [ ! -d ./node_modules/.pyodide ]; then
  echo "download pyodide"
  cd ./node_modules/
  curl -L -o .pyodide.tar.bz2 https://github.com/pyodide/pyodide/releases/download/0.22.1/pyodide-0.22.1.tar.bz2
  tar -jxf .pyodide.tar.bz2
  rm .pyodide.tar.bz2
  cd ..
fi

if [ ! -d ./public/pyodide ]; then
  echo "mkdir public/pyodide"
  mkdir ./public/pyodide
fi
cp -r ./node_modules/.pyodide/* ./public/pyodide/
