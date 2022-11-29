import { defineComponent } from "vue"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
import { watchComputed } from "@/utils"
export default defineComponent(() => {
  const { root, loadDSL } = useCanvasStore()
  loadDSL()
  let renderedRoot = watchComputed(root, () => renderComp(root))
  return () => (
    <div>
      {renderedRoot.value}
    </div>
  )
})

