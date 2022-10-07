import type { dslContainerElement, dslRootElement } from "@/models"
import { isParent } from "@/models"
import { Slots } from "@/slots"
import { useCanvasStore } from "@/store"
export function genCompList(dsl: dslContainerElement | dslRootElement) {
  const { binderList, propList } = useCanvasStore()
  return dsl.children.map((ele) => {
    const { type, id, children } = ele
    const Element = Slots.get(type)!
    if (children) {
      return (
        <Element
            binder={binderList.get(id)!}
            prop={propList.get(id)!}
            key={id}
        >
          {children!.map((child) => {
            if (isParent(child)) {
              return genCompList(child)
            } else {
              const { id, type } = child
              const Child = Slots.get(type)!
              return (
                <Child
                  binder={binderList.get(id)!}
                  prop={propList.get(id)!}
                  key={id}
                />)
            }
          })}
        </Element>)
    } else {
      return (
        <Element
          binder={binderList.get(id)!}
          prop={propList.get(id)!}
          key={id}
        />)
    }
  })
}

