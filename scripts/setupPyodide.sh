#! bash
cd ./node_modules/
if [ ! -f ./.pyodide.tar.bz2 ]; then
  echo "download pyodide.tbz2"
  curl -L -o .pyodide.tar.bz2 https://github.com/pyodide/pyodide/releases/download/0.22.1/pyodide-core-0.22.1.tar.bz2
else
  echo "pyodide.tbz2 exsist"
fi
  tar -jxf .pyodide.tar.bz2 -C ../public/pyodide
