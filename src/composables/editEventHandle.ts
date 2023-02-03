import { nextTick } from "vue"
import type { useCanvasStore } from "@/store/canvasStore"
import { containerSlots, isParent, isParentAndSun, isSun } from "@/models/slots"
import type { MoveSlotDragger, NewSlotDragger } from "@/models/drags"
import type { DslBaseElement, DslSunElement, EFlexOptions } from "@/models/slots"

export function dropComp(ev: DragEvent, comp: DslBaseElement, storeUtilities: ReturnType<typeof useCanvasStore>) {
  ev.preventDefault()
  ev.stopPropagation()
  const {
    insertElement, appendElement,
    posPrompt, setSelectedElement,
    dslList,
  } = storeUtilities
  const data: NewSlotDragger | MoveSlotDragger = JSON.parse(ev.dataTransfer!.getData("text/plain"))

  if (data.type === "moveSlot" && isSun(comp) && isParentAndSun(dslList.get(data.id) as DslSunElement, comp)) {
    return
  }
  let curComp: DslSunElement
  if (isParent(comp) && comp.children.length === 0) {
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
    setHoverHelper, setPosPrompt, clearPosPrompt, implList, propList,
  } = storeUtilities
  const { left, top, width, height } = (implList.get(comp.id)!.el as HTMLElement).getBoundingClientRect()
  setHoverHelper({ left, top, width, height })
  if (isParent(comp) && comp.children.length === 0) {
    // 在container parent上
    clearPosPrompt()
  } else if (isSun(comp)) {
    const parentDirection = (propList.get(comp.parent.id) as EFlexOptions).style["flex-direction"]
    if (parentDirection === "row") {
      // 横着算
      if (ev.clientX - left < width / 2) {
        setPosPrompt({ left, top, width: 3, height, type: "left" })
      } else {
        setPosPrompt({ left: left + width, top, width: 3, height, type: "right" })
      }
    } else {
      // 竖者算
      if (ev.clientY - top < height / 2) {
        setPosPrompt({ left, top, width, height: 3, type: "top" })
      } else {
        setPosPrompt({ left, top: top + height, width, height: 3, type: "bottom" })
      }
    }
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
