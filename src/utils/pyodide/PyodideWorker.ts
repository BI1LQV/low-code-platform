import type { PyProxy } from "pyodide"
import { loadPyodide } from "pyodide"
import { expose } from "comlink"
function returnValAndClean(val: PyProxy) {
  const res = val.toJs()
  val.destroy()
  return res
}
const funcPool: Record<string, Function> = {}
class PyodideWorker {
  // @ts-expect-error safe after _load
  pyodide: Awaited<ReturnType<typeof loadPyodide>> = null
  micropip: any
  async _load() {
    this.pyodide = await loadPyodide({
      indexURL: "/pyodide",
    })
    await this.pyodide.loadPackage("micropip")
    this.micropip = this.pyodide.pyimport("micropip")
    await this.micropip.install("global-call-browser")
    const gbcallVersion = await this.pyodide.runPython(`
    from importlib.metadata import version
    version('global-call-browser')
    `)
    console.log(`loaded global-call version ${gbcallVersion}`)
  }

  scanner: any

  async scanTypes(code: string) {
    this.scanner ??= this.pyodide.pyimport("gbcall.scanner").scanner
    return returnValAndClean(this.scanner(code))
  }

  async installDeps(deps: string[]) {
    return await this.micropip.install(deps)
  }

  async callFunc(funcName: string, impl: string, args: any[]) {
    if (funcName in funcPool) {
      return returnValAndClean(await funcPool[funcName](...args))
    } else {
      const pyFunc = this.pyodide.runPython(`${impl}\n${funcName}`)
      funcPool[funcName] = pyFunc
      return returnValAndClean(await pyFunc(...args))
    }
  }

  async getLoadedPackages() {
    return this.pyodide.loadedPackages
  }
}

expose(PyodideWorker)
export type { PyodideWorker }
