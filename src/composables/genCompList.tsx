import type { DslBaseElement } from "@/models/slots"
import { Slots } from "@/slots"
import { binderList, implList, propList, useCanvasStore } from "@/store/canvasStore"

export function renderComp(comp: DslBaseElement) {
  const { setSelectedElement } = useCanvasStore()
  const { type, id, children } = comp
  const Element = Slots.get(type)!
  const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        onClickCapture={() => setSelectedElement(comp)}
        onDragover={(ev: DragEvent) => ev.preventDefault()}
      >{
        children && children.map(child => renderComp(child))
      }</Element>
  implList.set(id, compImpl)
  return compImpl
}

