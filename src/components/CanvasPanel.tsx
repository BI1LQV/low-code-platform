import { defineComponent } from "vue"
import { useCanvasStore } from "@/store"

import { renderComp } from "@/composables/genCompList"
import { watchComputed } from "@/utils"
export default defineComponent(() => {
  const { root, selectorPos } = useCanvasStore()

  let renderedRoot = watchComputed(root, () => renderComp(root))

  return () => (
    <div class="w-800px border-3px">
      <div
        class="\
          w-800px border-5px border-green \
          absolute pointer-events-none \
          transition-all duration-200 \
        "
        style={
          {
            "height": `${selectorPos.h}px`,
            "width": `${selectorPos.w}px`,
            "left": `${selectorPos.x}px`,
            "top": `${selectorPos.y}px`,
          }
        }
      ></div>
      { renderedRoot.value}
    </div>
  )
})

