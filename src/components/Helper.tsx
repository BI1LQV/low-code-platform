import { Teleport, defineComponent } from "vue"
import { storeToRefs } from "pinia"
import helperCss from "./helper.module.css"
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
        border-5px border-green
        absolute pointer-events-none
        duration-200
        style={{
          ...renderStyle(selectorPos),
          "transition-property": isShowSelectorPos.value ? "all" : "none",
        }}
      >
        <div absolute right-0 top--24px class={helperCss["click-helper"]}>
          <button class={helperCss["click-helper-parent"]}></button>
          <button class={helperCss["click-helper-move"]}></button>
          <button class={helperCss["click-helper-delete"]}></button>
        </div>
      </div>
      {/* insert helper */}
      <div
        bg-blue absolute pointer-events-none
        style={renderStyle(posPrompt)}
      ></div>
      {/* hover helper */}
      <div
        border-3px border-gray border-dashed
        absolute pointer-events-none
        style={renderStyle(hoverHelper)}
      ></div>
    </Teleport>
  )
})
