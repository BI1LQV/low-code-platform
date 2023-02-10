import { computed, defineComponent } from "vue"
import Helper from "./Helper"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
export default defineComponent(() => {
  const { root } = useCanvasStore()

  let renderedRoot = computed(() => renderComp(root, true))
  return () => (
    <div h-full w-full>
      <Helper></Helper>
      {renderedRoot.value}
    </div>
  )
})

