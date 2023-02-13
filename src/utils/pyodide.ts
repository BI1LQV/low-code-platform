const pyodide = await window.loadPyodide()

// init global-call-browser
await pyodide.loadPackage("micropip")
const micropip = pyodide.pyimport("micropip")
await micropip.install("global-call-browser")

const gbcallVersion = await pyodide.runPython(`
from importlib.metadata import version
version('global-call-browser')
`)
console.log(`loaded global-call version ${gbcallVersion}`)

const scanner = pyodide.pyimport("gbcall.scanner").scanner

export function scanTypes(code: string) {
  const pyRes = scanner(code)
  const res = pyRes.toJs()
  res.destroy()
  return res
}
