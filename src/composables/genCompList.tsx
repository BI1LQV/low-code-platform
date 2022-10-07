import type { dslBaseElement, dslContainerElement, dslRootElement } from "@/models"
import { isParent } from "@/models"
import { Slots } from "@/slots"
import { binderList, implList, propList, useCanvasStore } from "@/store"

export function genComp(dsl: dslContainerElement | dslRootElement) {
  const { setSelectedElement } = useCanvasStore()
  function renderComp(comp: Omit<dslBaseElement, "parent">, children?: JSX.Element[]) {
    const { type, id } = comp
    const Element = Slots.get(type)!
    const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        onClickCapture={() => setSelectedElement(comp)}
      >{children}</Element>
    implList.set(id, compImpl)
    return compImpl
  }
  const { children } = dsl
  if (children) {
    let childrenImpl: JSX.Element[] = children.map((child) => {
      if (isParent(child)) {
        return genComp(child)
      } else {
        return renderComp(child)
      }
    })
    return renderComp(dsl, childrenImpl)
  } else {
    return renderComp(dsl)
  }
}

