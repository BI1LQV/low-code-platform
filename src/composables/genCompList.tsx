import type { dslBaseElement, dslContainerElement, dslRootElement } from "@/models"
import { isParent } from "@/models"
import { Slots } from "@/slots"
import { binderList, implList, propList, useCanvasStore } from "@/store"

export function genCompList(dsl: dslContainerElement | dslRootElement) {
  const { setSelectedElement } = useCanvasStore()
  function renderComp(comp: dslBaseElement) {
    const { type, id } = comp
    const Element = Slots.get(type)!
    const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        onClick={() => setSelectedElement(comp)}
      />
    implList.set(id, compImpl)
    return compImpl
  }

  return dsl.children.map((rootsChild) => {
    const { type, id, children } = rootsChild
    const Element = Slots.get(type)!
    if (children) {
      const compImpl = <Element
            binder={binderList.get(id)!}
            prop={propList.get(id)!}
            key={id}
            onClickCapture={() => setSelectedElement(rootsChild)}
        >
          {children!.map((child) => {
            if (isParent(child)) {
              return genCompList(child)
            } else {
              return renderComp(child)
            }
          })}
      </Element>
      implList.set(id, compImpl)
      return compImpl
    } else {
      return renderComp(rootsChild)
    }
  })
}

