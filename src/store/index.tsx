import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive, ref, watch } from "vue"
import type { SlotOptions, dslBaseElement, dslContainerElement, dslFunctionalElement, dslRootElement, passedChild } from "@/models"
import { containerSlots, isRoot, rootID } from "@/models"
import { genId } from "@/utils"

export const binderList: Map<string, Ref<any>> = new Map()
export const propList: Map<string, SlotOptions> = new Map()
export const implList: Map<string, JSX.Element> = new Map()
export const dslList: Map<string, dslContainerElement | dslFunctionalElement | dslRootElement> = new Map()

export const useCanvasStore = defineStore("canvasStore", () => {
  const root: dslRootElement = reactive({
    children: [],
    type: containerSlots.ERoot,
    id: rootID,
  })
  dslList.set(rootID, root)
  function Base(
    { type, binder, prop }: passedChild, parent: dslContainerElement | dslRootElement,
  ): dslBaseElement {
    const id = genId()
    binderList.set(id, binder)
    propList.set(id, prop)
    let base
    if (type in containerSlots) {
      base = reactive({ id, type, parent, children: [] })
    } else {
      base = reactive({ id, type, parent })
    }
    dslList.set(id, base)
    return base
  }

  function insertElement(child: passedChild, parent?: dslContainerElement | dslRootElement) {
    parent ??= root
    const childImpl = Base(child, parent)
    parent.children.push(childImpl)
    return childImpl
  }

  function appendElement(
    child: passedChild,
    posElement: dslBaseElement,
    _pos: "before" | "after",
  ) {
    const childImpl = Base(child, posElement.parent)
    const insertPlace = posElement.parent.children.findIndex(originEle => originEle === posElement)
    posElement.parent.children.splice(insertPlace, 0, childImpl)
    return childImpl
  }
  let selectedElementId = ref<string>(rootID)
  function setSelectedElement(comp: { id: string }) {
    selectedElementId.value = comp.id
  }
  let selectorPos = reactive({ x: -100, y: -100, h: 0, w: 0 })
  watch(selectedElementId, () => {
    let selectedElement = dslList.get(selectedElementId.value)!
    if (!isRoot(selectedElement)) {
      let impl = implList.get(selectedElementId.value)
      if (impl) {
        const { left, top, height, width } = impl.el!.getBoundingClientRect()
        selectorPos.x = left
        selectorPos.y = top
        selectorPos.h = height
        selectorPos.w = width
      }
    }
  })
  return {
    root,
    appendElement,
    insertElement,
    selectedElementId,
    setSelectedElement,
    selectorPos,
  }
})
