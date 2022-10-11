import { ref } from "vue"
import type { MoveSlotDragger, NewSlotDragger } from "@/models/drags"
import type { DslBaseElement, EFlexOptions } from "@/models/slots"
import { isParent, isSun } from "@/models/slots"
import { Slots } from "@/slots"
import { binderList, implList, propList, useCanvasStore } from "@/store/canvasStore"

export function renderComp(comp: DslBaseElement) {
  const { setSelectedElement, insertElement } = useCanvasStore()
  const { type, id, children } = comp
  function dropComp(ev: DragEvent) {
    ev.preventDefault()
    const data: NewSlotDragger | MoveSlotDragger = JSON.parse(ev.dataTransfer!.getData("text/plain"))
    if (data.type === "newSlot") {
      if (isParent(comp)) {
        insertElement({
          type: data.slot,
          binder: ref(),
        }, comp)
      } else {
        // console.log()
        // console.log(ev.clientY)
      }
    }
  }
  function dragOverComp(ev: DragEvent) {
    ev.preventDefault()
    if (!isParent(comp) && isSun(comp)) {
      const { left, top } = (implList.get(comp.id)!.el as HTMLElement).getBoundingClientRect()
      console.log(ev.clientX - left, ev.clientY - top)
      console.log(comp.parent.id, propList.get(comp.parent.id) as EFlexOptions)
    }
  }
  const Element = Slots.get(type)!
  const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        onClickCapture={() => setSelectedElement(comp)}
        onDragover={(ev: DragEvent) => dragOverComp(ev)}
        onDrop={(ev: DragEvent) => dropComp(ev)}
      >{
        children && children.map(child => renderComp(child))
      }</Element>
  implList.set(id, compImpl)
  return compImpl
}

