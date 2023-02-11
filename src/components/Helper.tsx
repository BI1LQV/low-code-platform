import { Teleport, computed, defineComponent } from "vue"
import { storeToRefs } from "pinia"
import helperCss from "@/styles/helper.module.css"
import { useCanvasStore } from "@/store/canvasStore"
import { renderStyle } from "@/utils"
import { isRoot, isSun } from "@/models/slots"
import type { MoveSlotDragger } from "@/models/drags"

export default defineComponent(() => {
  const canvasStore = useCanvasStore()
  const { selectorPos, posPrompt, hoverHelper, removeElement, setSelectedElement, clearDragEffect, dslList } = canvasStore
  const { isShowSelectorPos, selectedElementId } = storeToRefs(canvasStore)
  const selectedDslComp = computed(() => dslList.get(selectedElementId.value))
  function toParent() {
    isSun(selectedDslComp.value) && !isRoot(selectedDslComp.value.parent) && setSelectedElement(selectedDslComp.value.parent)
  }

  function deleteComp() {
    // @ts-expect-error it's safe
    removeElement(selectedDslComp.value)
  }

  function dragHandler(ev: DragEvent) {
    ev.dataTransfer!.setData("text/plain", JSON.stringify({ type: "moveSlot", id: selectedElementId.value } as MoveSlotDragger))
  }
  return () => (
    <Teleport to={"body"}>
    {/* click helper */}
      <div
        border-5px border-green
        fixed pointer-events-none
        duration-200
        style={{
          ...renderStyle(selectorPos),
          "transition-property": isShowSelectorPos.value ? "all" : "none",
        }}
      >
        <div absolute right-0 top--24px pointer-events-initial w-60px class={helperCss["click-helper"]}>
          <button class={helperCss["click-helper-parent"]} onClick={toParent}></button>
          <button
          class={helperCss["click-helper-move"]}
          draggable={true}
          onDragstart={dragHandler}
          onDragend={clearDragEffect}></button>
          <button class={helperCss["click-helper-delete"]} onClick={deleteComp}></button>
        </div>
      </div>
      {/* insert helper */}
      <div
        bg-blue fixed pointer-events-none
        style={renderStyle(posPrompt)}
      ></div>
      {/* hover helper */}
      <div
        border-3px border-gray border-dashed
        fixed pointer-events-none
        style={renderStyle(hoverHelper)}
      ></div>
    </Teleport>
  )
})
