import { Teleport, defineComponent } from "vue"
import { useCanvasStore } from "@/store/canvasStore"
import { renderStyle } from "@/utils"

export default defineComponent(() => {
  const { selectorPos, posPrompt, hoverHelper } = useCanvasStore()
  return () => (
    <Teleport to={"#app"}>
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
