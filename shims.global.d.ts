declare global {
  import type { loadPyodide as loader } from "pyodide"
  interface Window {
    loadPyodide: typeof loader
  }
}
export { }
