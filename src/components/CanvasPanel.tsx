import { defineComponent } from "vue"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
import { renderStyle, watchComputed } from "@/utils"
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
        style={renderStyle(selectorPos)}
      ></div>
      {/* insert helper */}
      <div
        class="\
          bg-blue \
          absolute pointer-events-none \
        "
        style={
          renderStyle(posPrompt)}
      ></div>
      {renderedRoot.value}
    </div>)
})

