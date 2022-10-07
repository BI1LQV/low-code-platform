import { defineComponent, ref, watch } from "vue"
import { useCanvasStore } from "@/store"

import { genCompList } from "@/composables/genCompList"
export default defineComponent(() => {
  const { root, selectorPos } = useCanvasStore()

  let renderedCompList = ref()
  watch(root, () => {
    renderedCompList.value = genCompList(root)
  })

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
      { renderedCompList.value }
    </div>
  )
})

