import type { dslBaseElement } from "@/models"
import { isParent } from "@/models"
import { Slots } from "@/slots"
import { binderList, implList, propList, useCanvasStore } from "@/store"

export function renderComp(comp: Omit<dslBaseElement, "parent">) {
  const { setSelectedElement } = useCanvasStore()
  const { type, id, children } = comp
  const Element = Slots.get(type)!
  const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        onClickCapture={() => setSelectedElement(comp)}
      >{
        children && children.map((child) => {
          if (isParent(child)) {
            return renderComp(child)
          } else {
            return renderComp(child)
          }
        })
      }</Element>
  implList.set(id, compImpl)
  return compImpl
}

