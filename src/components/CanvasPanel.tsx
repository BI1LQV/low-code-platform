import { defineComponent, ref, watch } from "vue"
import { useCanvasStore } from "@/store"

import { genComp } from "@/composables/genCompList"
export default defineComponent(() => {
  const { root, selectorPos } = useCanvasStore()

  let renderedRoot = ref()
  watch(root, () => {
    renderedRoot.value = genComp(root)
  }, { immediate: true })

  return () => (
    <div class="w-800px border-3px">
      <div class="w-800px border-5px border-green absolute" style={
        {
          "height": `${selectorPos.h}px`,
          "width": `${selectorPos.w}px`,
          "left": `${selectorPos.x}px`,
          "top": `${selectorPos.y}px`,
          "pointer-events": "none",
        }
      }></div>
      { renderedRoot.value }
    </div>
  )
})

