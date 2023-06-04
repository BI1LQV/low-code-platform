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

function returnValAndClean(val: any) {
  if (typeof val.toJs === "function") {
    const res = val.toJs()
    val.destroy()
    return res
  } else {
    return val
  }
}

export async function scanTypes(code: string) {
  return returnValAndClean(scanner(code))
}

export async function installDeps(deps: string[]) {
  return await micropip.install(deps)
}

const funcPool: Record<string, Function> = {}

export async function callFunc(funcName: string, impl: string, args: any[]) {
  if (!(impl in funcPool)) {
    const pyFunc = pyodide.runPython(`${impl}\n${funcName}`)
    funcPool[impl] = pyFunc
  }
  return returnValAndClean(await funcPool[impl](...args))
}

export async function getLoadedPackages() {
  return pyodide.loadedPackages
}
