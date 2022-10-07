import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive } from "vue"
import type { SlotOptions, dslBaseElement, dslContainerElement, dslRootElement, passedChild } from "@/models"
import { containerSlots } from "@/models"
import { genId } from "@/utils"

export const useCanvasStore = defineStore("counter", () => {
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
      return { id, type, parent, children: [] }
    } else {
      return { id, type, parent }
    }
  }

  function insertElement(child: passedChild, parent?: dslContainerElement | dslRootElement) {
    parent ??= root
    parent.children.push(Base(child, parent))
  }

  function appendElement(
    child: passedChild,
    posElement: dslBaseElement,
    _pos: "before" | "after",
  ) {
    const insertPlace = posElement.parent.children.findIndex(originEle => originEle === posElement)
    posElement.parent.children.splice(insertPlace, 0, Base(child, posElement.parent))
  }
  return { dsl: root, binderList, propList, appendElement, insertElement }
})
