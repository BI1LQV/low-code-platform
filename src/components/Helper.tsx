import { Teleport, defineComponent } from "vue"
import { storeToRefs } from "pinia"
import { useCanvasStore } from "@/store/canvasStore"
import { renderStyle } from "@/utils"

export default defineComponent(() => {
  const canvasStore = useCanvasStore()
  const { selectorPos, posPrompt, hoverHelper } = canvasStore
  const { isShowSelectorPos } = storeToRefs(canvasStore)
  return () => (
    <Teleport to={"#app"}>
    {/* click helper */}
      <div
        class="\
          border-5px border-green \
          absolute pointer-events-none \
          duration-200 \
        "
        style={{
          ...renderStyle(selectorPos),
          "transition-property": isShowSelectorPos.value ? "all" : "none",
        }}
      ></div>
      {/* insert helper */}
      <div
        class="\
          bg-blue \
          absolute pointer-events-none \
        "
        style={renderStyle(posPrompt)}
      ></div>
      {/* hover helper */}
      <div
        class="\
          border-3px border-gray border-dashed\
          absolute pointer-events-none \
        "
        style={renderStyle(hoverHelper)}
      ></div>
    </Teleport>
  )
})
