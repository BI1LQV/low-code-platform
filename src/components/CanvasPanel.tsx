import { defineComponent } from "vue"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
import { watchComputed } from "@/utils"
export default defineComponent(() => {
  const { root, selectorPos, posPrompt } = useCanvasStore()

  let renderedRoot = watchComputed(root, () => renderComp(root))
  return () => (<div class="w-800px border-3px">
    {/* click helper */}
      <div
        class="\
          border-5px border-green \
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
      {/* insert helper */}
      <div
        class="\
          bg-blue \
          absolute pointer-events-none \
        "
        style={
          {
            "height": `${posPrompt.height}px`,
            "width": `${posPrompt.width}px`,
            "left": `${posPrompt.left}px`,
            "top": `${posPrompt.top}px`,
          }
        }
      ></div>
      {renderedRoot.value}
    </div>)
})

