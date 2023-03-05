import { clickComp, dragOverComp, dropComp } from "./editEventHandle"
import type { DslBaseElement } from "@/models/slots"

import { Slots } from "@/slots"
import { useCanvasStore } from "@/store/canvasStore"
import { useFuncStore } from "@/store/funcStore"

export function renderComp(comp: DslBaseElement, editing: boolean) {
  const { type, id, children } = comp
  const canvasStore = useCanvasStore()
  const funcStore = useFuncStore()
  const { binderList, implList, propList } = canvasStore
  const editEventHandlers = editing
    ? {
        onClick: (ev: MouseEvent) => clickComp(ev, comp, canvasStore),
        onDragover: (ev: DragEvent) => dragOverComp(ev, comp, canvasStore),
        onDrop: (ev: DragEvent) => dropComp(ev, comp, canvasStore),
      }
    : null

  const events = propList.get(id)?.events
  const eventHandler
   = editing
     ? null
     : Object.entries(events ?? {}).reduce((pre, [name, fns]) => {
       pre[`on${name[0].toUpperCase()}${name.slice(1)}`] = () => {
         (fns as string[]).forEach((fnName) => {
           funcStore.callFunc(fnName)
         })
       }
       return pre
     }, {} as Record<string, () => void>)

  console.log(eventHandler)

  const Element = Slots.get(type)!
  const compImpl = <Element
        binder={binderList.get(id)!}
        prop={propList.get(id)!}
        key={id}
        isProd={!editing}
        {...editEventHandlers}
        {...eventHandler}
      >{
        children && children.map(child => renderComp(child, editing))
      }</Element>
  implList.set(id, compImpl)
  return compImpl
}

