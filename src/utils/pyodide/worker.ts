import "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js"

const pyodide = await self.loadPyodide()
const exports: any = {}

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

export const scanTypes = exports.scanTypes = async (code: string) => {
  const pyRes = scanner(code)
  const res = pyRes.toJs()
  pyRes.destroy()
  return res
}
self.postMessage({ id: "loaded" })
self.onmessage = async ({ data: { id, funcName, data } }) => {
  try {
    self.postMessage({ id, data: await exports[funcName](...data) })
  } catch (e) {
    self.postMessage({ id, err: JSON.stringify(e) })
  }
}
