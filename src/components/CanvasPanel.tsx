import { defineComponent } from "vue"
import Helper from "./Helper"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
import { watchComputed } from "@/utils"
export default defineComponent(() => {
  const { root } = useCanvasStore()

  let renderedRoot = watchComputed(root, () => renderComp(root, true))
  return () => (
    <div h-full w-full>
      <Helper></Helper>
      {renderedRoot.value}
    </div>
  )
})

