import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive } from "vue"
import type { SlotOptions, dslBaseElement, dslContainerElement, dslRootElement, passedChild } from "@/models"
import { containerSlots } from "@/models"
import { genId } from "@/utils"

export const useCanvasStore = defineStore("canvasStore", () => {
  const root: dslRootElement = reactive({
    children: [],
  })
  let binderList: Map<string, Ref<any>> = new Map()
  let propList: Map<string, SlotOptions> = new Map()

  function Base(
    { type, binder, prop }: passedChild, parent: dslContainerElement | dslRootElement,
  ): dslBaseElement {
    const id = genId()
    binderList.set(id, binder)
    propList.set(id, prop)
    if (type in containerSlots) {
      return reactive({ id, type, parent, children: [] })
    } else {
      return reactive({ id, type, parent })
    }
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
  return { dsl: root, binderList, propList, appendElement, insertElement }
})
