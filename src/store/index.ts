import { useCanvasStore } from "./canvasStore"
import { useFuncStore } from "./funcStore"

export function save() {
  useCanvasStore().saveDSL()
  useFuncStore().saveFunc()
}
export function load() {
  useCanvasStore().loadDSL()
  useFuncStore().loadFunc()
}

export function exportString() {
  return JSON.stringify({
    ...useCanvasStore().saveDSL(),
    ...useFuncStore().saveFunc(),
  })
}
export function importString(str: string) {
  const dsl = JSON.parse(str)
  useCanvasStore().loadDSL(dsl)
  useFuncStore().loadFunc(dsl)
}
