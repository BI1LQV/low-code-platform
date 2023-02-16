import type { PyProxy } from "pyodide"
import { loadPyodide } from "pyodide"

// init
export const pyodide = await loadPyodide({ indexURL: "/pyodide" })
await pyodide.loadPackage("micropip")
const micropip = pyodide.pyimport("micropip")
await micropip.install("global-call-browser")
const gbcallVersion = await pyodide.runPython(`
  from importlib.metadata import version
  version('global-call-browser')
  `)
console.log(`loaded global-call version ${gbcallVersion}`)

let scanner = pyodide.pyimport("gbcall.scanner").scanner

function returnValAndClean(val: PyProxy) {
  const res = val.toJs()
  val.destroy()
  return res
}

export async function scanTypes(code: string) {
  return returnValAndClean(scanner(code))
}

export async function installDeps(deps: string[]) {
  return await micropip.install(deps)
}

const funcPool: Record<string, Function> = {}

export async function callFunc(funcName: string, impl: string, args: any[]) {
  if (funcName in funcPool) {
    return returnValAndClean(await funcPool[funcName](...args))
  } else {
    const pyFunc = pyodide.runPython(`${impl}\n${funcName}`)
    funcPool[funcName] = pyFunc
    return returnValAndClean(await pyFunc(...args))
  }
}

export async function getLoadedPackages() {
  return pyodide.loadedPackages
}
console.log("loaded")
// self.postMessage("loaded")
