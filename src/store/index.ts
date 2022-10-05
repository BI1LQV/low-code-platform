import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive, ref } from "vue"
import type { Styles, dslElement, dslRoot } from "@/models"

export const useCanvasStore = defineStore("counter", () => {
  const dsl: dslRoot = reactive({
    children: [],
  })
  dsl.children.push(
    { type: "input", id: "1", children: [], parent: dsl },
    { type: "input", id: "2", children: [], parent: dsl },
    { type: "input", id: "3", children: [], parent: dsl },
  )
  let binderList: Map<string, Ref<any>> = new Map([
    ["1", ref(1)],
    ["2", ref(1)],
    ["3", ref(1)],
  ])
  let propList: Map<string, Ref<any>> = new Map([
    ["1", ref(1)],
    ["2", ref(1)],
    ["3", ref(1)],
  ])
  let styleList: Map<string, Styles> = new Map([
    ["1", { "height": "200px" }],
    ["2", {}],
    ["3", {}],
  ] as any)
  function appendElement(
    posElement: dslElement,
    pos: "before" | "after",
    { dsl, binder, prop, style }: {
      dsl: dslElement
      binder: Ref<any>
      prop: Ref<any>
      style: Styles
    }) {
    const { id } = dsl
    posElement.parent.children.splice(2, 0, dsl)
    binderList.set(id, binder)
    propList.set(id, prop)
    styleList.set(id, style)
  }
  return { dsl, binderList, styleList, propList, appendElement }
})
