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
