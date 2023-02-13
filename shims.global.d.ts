import type { loadPyodide as loader } from "pyodide"
declare global {
  interface Window {
    loadPyodide: typeof loader
  }
}
export { }
