import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive } from "vue"
import type { Options, Styles, allSlots, dslElement, dslRoot } from "@/models"

export const useCanvasStore = defineStore("counter", () => {
  const dsl: dslRoot = reactive({
    children: [],
  })
  let binderList: Map<string, Ref<any>> = new Map()
  let propList: Map<string, Options> = new Map()
  let styleList: Map<string, Styles> = new Map()

  function appendElement(child: {
    type: allSlots
    binder: Ref<any>
    prop: Options
    style: Styles
  }): void
  function appendElement(child: {
    type: allSlots
    binder: Ref<any>
    prop: Options
    style: Styles
  }, posElement: dslElement, pos: "before" | "after"): void

  function appendElement(
    { type, binder, prop, style }: {
      type: allSlots
      binder: Ref<any>
      prop: Options
      style: Styles
    },
    posElement?: dslElement,
    _pos?: "before" | "after",
  ) {
    const id = Math.random().toString()

    if (!posElement) {
      let child: dslElement = {
        id,
        type,
        parent: dsl,
        children: [],
      }
      dsl.children.push(child)
    } else {
      let child: dslElement = {
        id,
        type,
        parent: posElement.parent,
        children: [],
      }
      const insertPlace = posElement.parent.children.findIndex(originEle => originEle === posElement)
      posElement.parent.children.splice(insertPlace, 0, child)
    }
    binderList.set(id, binder)
    propList.set(id, prop)
    styleList.set(id, style)
  }
  return { dsl, binderList, styleList, propList, appendElement }
})
