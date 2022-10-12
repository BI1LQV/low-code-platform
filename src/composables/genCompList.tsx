import type { MoveSlotDragger, NewSlotDragger } from "@/models/drags"
import type { DslBaseElement, EFlexOptions } from "@/models/slots"
import { containerSlots, isParent, isSun } from "@/models/slots"
import { Slots } from "@/slots"
import { binderList, implList, propList, useCanvasStore } from "@/store/canvasStore"

export function renderComp(comp: DslBaseElement) {
  const {
    setSelectedElement, insertElement, appendElement,
    setPosPrompt, posPrompt, clearPosPrompt,
    setHoverHelper,

  } = useCanvasStore()
  const { type, id, children } = comp
  function dropComp(ev: DragEvent) {
    ev.preventDefault()
    ev.stopPropagation()
    const data: NewSlotDragger | MoveSlotDragger = JSON.parse(ev.dataTransfer!.getData("text/plain"))
    if (data.type === "newSlot") {
      if (isParent(comp)) {
        insertElement({
          type: data.slot,
        }, comp)
      } else if (isSun(comp)) {
        const pos = ["left", "top"].includes(posPrompt.type) ? "before" : "after"
        appendElement({ type: data.slot }, comp, pos)
      } else {
        console.log("???")
      }
    }
  }
  function dragOverComp(ev: DragEvent) {
    ev.preventDefault()
    ev.stopPropagation()
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
  function clickComp(ev: MouseEvent) {
    ev.stopPropagation()
    if (comp.type === containerSlots.ERoot) {
      setSelectedElement({ id: "" })
    } else {
      setSelectedElement(comp)
    }
  }
  const Element = Slots.get(type)!
  const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        onClick={(ev: MouseEvent) => clickComp(ev)}
        onDragover={(ev: DragEvent) => dragOverComp(ev)}
        onDrop={(ev: DragEvent) => dropComp(ev)}
      >{
        children && children.map(child => renderComp(child))
      }</Element>
  implList.set(id, compImpl)
  return compImpl
}

