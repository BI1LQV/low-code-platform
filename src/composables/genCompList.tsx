import { clickComp, dragOverComp, dropComp } from "./editEventHandle"
import type { DslBaseElement } from "@/models/slots"

import { Slots } from "@/slots"
import { binderList, implList, propList, useCanvasStore } from "@/store/canvasStore"

export function renderComp(comp: DslBaseElement, editing: boolean) {
  const { type, id, children } = comp
  const canvasStore = useCanvasStore()

  const editEventHandlers = editing
    ? {
        onClick: (ev: MouseEvent) => clickComp(ev, comp, canvasStore),
        onDragover: (ev: DragEvent) => dragOverComp(ev, comp, canvasStore),
        onDrop: (ev: DragEvent) => dropComp(ev, comp, canvasStore),
      }
    : null

  const Element = Slots.get(type)!
  const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        isProd={!editing}
        {...editEventHandlers}
      >{
        children && children.map(child => renderComp(child, editing))
      }</Element>
  implList.set(id, compImpl)
  return compImpl
}

