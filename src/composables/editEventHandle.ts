import { nextTick } from "vue"
import type { useCanvasStore } from "@/store/canvasStore"
import { implList, propList } from "@/store/canvasStore"
import { containerSlots, isParent, isSun } from "@/models/slots"
import type { MoveSlotDragger, NewSlotDragger } from "@/models/drags"
import type { DslBaseElement, DslSunElement, EFlexOptions } from "@/models/slots"

export function dropComp(ev: DragEvent, comp: DslBaseElement, storeUtilities: ReturnType<typeof useCanvasStore>) {
  ev.preventDefault()
  ev.stopPropagation()
  const {
    insertElement, appendElement,
    posPrompt, setSelectedElement,
  } = storeUtilities
  const data: NewSlotDragger | MoveSlotDragger = JSON.parse(ev.dataTransfer!.getData("text/plain"))
  let curComp: DslSunElement
  if (isParent(comp)) {
    curComp = insertElement(data, comp)
  } else if (isSun(comp)) {
    const pos = ["left", "top"].includes(posPrompt.type) ? "before" : "after"
    curComp = appendElement(data, comp, pos)
  } else {
    console.log("???")
  }
  setSelectedElement({ id: "" })
  nextTick(() => setSelectedElement(curComp))
}

export function dragOverComp(ev: DragEvent, comp: DslBaseElement, storeUtilities: ReturnType<typeof useCanvasStore>) {
  ev.preventDefault()
  ev.stopPropagation()
  const {
    setHoverHelper, setPosPrompt, clearPosPrompt,
  } = storeUtilities
  const { left, top, width, height } = (implList.get(comp.id)!.el as HTMLElement).getBoundingClientRect()
  setHoverHelper({ left, top, width, height })
  if (!isParent(comp) && isSun(comp)) {
    const parentDirection = (propList.get(comp.parent.id) as EFlexOptions).style["flex-direction"]
    if (parentDirection === "column") {
      // 横着算
      if (ev.clientX - left < width / 2) {
        setPosPrompt({ left, top, width: 3, height, type: "left" })
      } else {
        setPosPrompt({ left: left + width, top, width: 3, height, type: "right" })
      }
    } else {
      // 竖者算 TODO: 待测试
      if (ev.clientY - top < height / 2) {
        setPosPrompt({ left, top, width, height: 3, type: "bottom" })
      } else {
        setPosPrompt({ left, top: top + height, width, height: 3, type: "top" })
      }
    }
  } else {
    // 在container parent上
    clearPosPrompt()
  }
}
export function clickComp(ev: MouseEvent, comp: DslBaseElement, storeUtilities: ReturnType<typeof useCanvasStore>) {
  ev.stopPropagation()
  ev.preventDefault()
  ev.stopPropagation()
  const {
    setSelectedElement,
  } = storeUtilities
  if (comp.type === containerSlots.ERoot) {
    setSelectedElement({ id: "" })
  } else {
    setSelectedElement(comp)
  }
}
