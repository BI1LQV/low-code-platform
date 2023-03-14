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

export async function callFunc(funcName: string,
  inputTypes: string[], outputTypes: string[],
  impl: string, args: any[]) {
  if (!(funcName in funcPool)) {
    const pyFunc = pyodide.runPython(
`${impl}
from gbcall.callWithTypeCheck import callWithTypeCheck
lambda args,inputTypes,outputTypes:callWithTypeCheck(${funcName},inputTypes,outputTypes,args)
`)
    funcPool[impl] = pyFunc
  }
  return returnValAndClean(await funcPool[impl](args, inputTypes, outputTypes))
}

export async function getLoadedPackages() {
  return pyodide.loadedPackages
}
