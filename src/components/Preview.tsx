import { computed, defineComponent, watchEffect } from "vue"
import { useCanvasStore } from "@/store/canvasStore"

import { renderComp } from "@/composables/genCompList"
import { useLoadingStore } from "@/store/loadingStore"
import { wrappedFetch } from "@/utils/wrappedFetch"
export default defineComponent({
  props: { id: String },
  setup(props) {
    const { root } = useCanvasStore()
    watchEffect(() => {
      console.log(props.id)
      useLoadingStore()
        .setGlobalLoader("server func load",
          wrappedFetch(`/api/loadFuncs?id=${props.id}`).then((res) => {
            console.log(res)
          }))
    })
    let renderedRoot = computed(() => renderComp(root, false))
    return () => (
      <div h-full w-full>
        {renderedRoot.value}
      </div>
    )
  },
})

