import { defineComponent } from "vue"
import Helper from "./Helper"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
import { watchComputed } from "@/utils"
export default defineComponent(() => {
  const { root } = useCanvasStore()

  let renderedRoot = watchComputed(root, () => renderComp(root, true))
  return () => (
    <div w-800px border-3px>
      <Helper></Helper>
      {renderedRoot.value}
    </div>
  )
})

