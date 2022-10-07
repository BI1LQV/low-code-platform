import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive } from "vue"
import type { SlotOptions, allSlotsKey, dslBaseElement, dslRootElement } from "@/models"
import { containerSlots } from "@/models"
import { genId } from "@/utils"

export const useCanvasStore = defineStore("counter", () => {
  const dsl: dslRootElement = reactive({
    children: [],
  })
  let binderList: Map<string, Ref<any>> = new Map()
  let propList: Map<string, SlotOptions> = new Map()

  function appendElement(child: {
    type: allSlotsKey
    binder: Ref<any>
    prop: SlotOptions
  }): void
  function appendElement(child: {
    type: allSlotsKey
    binder: Ref<any>
    prop: SlotOptions
  }, posElement: dslBaseElement, pos: "before" | "after"): void

  function appendElement(
    { type, binder, prop }: {
      type: allSlotsKey
      binder: Ref<any>
      prop: SlotOptions
    },
    posElement?: dslBaseElement,
    _pos?: "before" | "after",
  ) {
    const id = genId()
    let base
    if (type in containerSlots) {
      base = { id, type, children: [] }
    } else {
      base = { id, type }
    }

    if (!posElement) {
      let child: dslBaseElement = {
        ...base,
        parent: dsl,
      }
      dsl.children.push(child)
    } else {
      let child: dslBaseElement = {
        ...base,
        parent: posElement.parent,
      }
      const insertPlace = posElement.parent.children.findIndex(originEle => originEle === posElement)
      posElement.parent.children.splice(insertPlace, 0, child)
    }
    binderList.set(id, binder)
    propList.set(id, prop)
  }
  return { dsl, binderList, propList, appendElement }
})
