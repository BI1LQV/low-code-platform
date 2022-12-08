import { defineComponent } from "vue"
import { load } from "@/store"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
import { watchComputed } from "@/utils"
export default defineComponent(() => {
  const { root } = useCanvasStore()
  load()
  let renderedRoot = watchComputed(root, () => renderComp(root, false))
  return () => (
    <div h-full w-full>
      {renderedRoot.value}
    </div>
  )
})

