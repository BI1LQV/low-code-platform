import { defineComponent, ref, watch } from "vue"
import { useCanvasStore } from "@/store"

import { genCompList } from "@/composables/genCompList"
export default defineComponent(() => {
  const { root } = useCanvasStore()

  let renderedCompList = ref()
  watch(root, () => {
    renderedCompList.value = genCompList(root)
  })
  return () => (
    <div class="w-800px border-3px">
     { renderedCompList.value }
    </div>
  )
})

