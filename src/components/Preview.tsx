import { computed, defineComponent } from "vue"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
export default defineComponent(() => {
  const { root } = useCanvasStore()
  let renderedRoot = computed(() => renderComp(root, false))
  return () => (
    <div h-full w-full>
      {renderedRoot.value}
    </div>
  )
})

