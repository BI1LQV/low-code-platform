import "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js"

let pyodide: Awaited<ReturnType<typeof self.loadPyodide>>
const exports: any = {}
let micropip: any
export const _load = exports._load = async () => {
  pyodide = await self.loadPyodide()
  await pyodide.loadPackage("micropip")
  micropip = pyodide.pyimport("micropip")
  await micropip.install("global-call-browser")
  const gbcallVersion = await pyodide.runPython(`
  from importlib.metadata import version
  version('global-call-browser')
  `)
  console.log(`loaded global-call version ${gbcallVersion}`)
}

let scanner: any

export const scanTypes = exports.scanTypes = async (code: string) => {
  scanner ??= pyodide.pyimport("gbcall.scanner").scanner
  const pyRes = scanner(code)
  const res = pyRes.toJs()
  pyRes.destroy()
  return res
}

export const installDeps = exports.installDeps = async (deps: string[]) => {
  return await micropip.install(deps)
}

self.onmessage = async ({ data: { id, funcName, data } }) => {
  try {
    self.postMessage({ id, data: await exports[funcName](...data) })
  } catch (e) {
    self.postMessage({ id, err: JSON.stringify(e) })
  }
}
