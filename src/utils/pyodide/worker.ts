import "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js"
import type { PyProxy } from "pyodide"

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

function returnValAndClean(val: PyProxy) {
  const res = val.toJs()
  val.destroy()
  return res
}

export const scanTypes = exports.scanTypes = async (code: string) => {
  scanner ??= pyodide.pyimport("gbcall.scanner").scanner
  return returnValAndClean(scanner(code))
}

export const installDeps = exports.installDeps = async (deps: string[]) => {
  return await micropip.install(deps)
}

const funcPool: Record<string, Function> = {}

export const callFunc = exports.callFunc = async (funcName: string, impl: string, args: any[]) => {
  if (funcName in funcPool) {
    return returnValAndClean(await funcPool[funcName](...args))
  } else {
    const pyFunc = pyodide.runPython(`${impl}\n${funcName}`)
    funcPool[funcName] = pyFunc
    return returnValAndClean(await pyFunc(...args))
  }
}

export const getLoadedPackages = exports.getLoadedPackages = async () => {
  return pyodide.loadedPackages
}

self.onmessage = async ({ data: { id, funcName, data } }) => {
  try {
    self.postMessage({ id, data: await exports[funcName](...data) })
  } catch (e) {
    console.log(e)
    self.postMessage({ id, err: JSON.stringify(e) })
  }
}
