import { ref } from "vue"
import type { MoveSlotDragger, NewSlotDragger } from "@/models/drags"
import type { DslBaseElement } from "@/models/slots"
import { isParent } from "@/models/slots"
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
          prop: {},
        }, comp)
      } else {
        // console.log()
        // console.log(ev.clientY)
      }
    }
  }
  function dragOverComp(ev: DragEvent) {
    ev.preventDefault()
    if (!isParent(comp)) {
      const { left, top } = (implList.get(comp.id)!.el as HTMLElement).getBoundingClientRect()
      console.log(ev.clientX - left, ev.clientY - top)
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

