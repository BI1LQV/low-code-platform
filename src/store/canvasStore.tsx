import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive, ref, watch, watchEffect } from "vue"
import { useElementBounding, useToggle } from "@vueuse/core"
import type { DslBaseElement, DslContainerElement, DslRootElement, DslSunElement, MaybeParent, SlotOptions, allSlotsKey, functionalSlots, passedChild } from "@/models/slots"
import { containerSlots, rootID } from "@/models/slots"
import { genId, watchComputed } from "@/utils"
import { Props } from "@/slots"
import type { StyleLike } from "@/models/drags"
import { clearableReactive } from "@/composables/clearableReactive"

export const binderList: Map<string, Ref<any>> = new Map()
export const propList: Map<string, SlotOptions> = new Map()
export const implList: Map<string, JSX.Element> = new Map()
export const dslList: Map<string, DslContainerElement | DslSunElement | DslBaseElement> = new Map()

function clearMap(id: string) {
  dslList.delete(id)
  implList.delete(id)
  propList.delete(id)
  binderList.delete(id)
}

window.store = { binderList, propList, implList, dslList }

export const useCanvasStore = defineStore("canvasStore", () => {
  // dsl tree
  const root: DslRootElement = reactive({
    children: [],
    type: containerSlots.ERoot,
    id: rootID,
  })
  propList.set(rootID, Props.get(containerSlots.ERoot)!())
  dslList.set(rootID, root)
  function Base(
    { type, binder = ref() }: passedChild<allSlotsKey>, parent: MaybeParent,
  ): DslSunElement {
    const id = genId()
    const prop = reactive(Props.get(type)!())
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

  // 一些dsl操作
  function insertElement(child: passedChild<containerSlots>, parent?: MaybeParent): DslContainerElement
  function insertElement(child: passedChild<functionalSlots>, parent?: MaybeParent): DslSunElement
  function insertElement(child: passedChild<allSlotsKey>, parent?: MaybeParent): DslSunElement

  function insertElement(child: passedChild, parent: MaybeParent = root): DslContainerElement | DslSunElement {
    const childImpl = Base(child, parent)
    parent.children.push(childImpl)
    return childImpl
  }

  function appendElement(
    child: passedChild<allSlotsKey>,
    posElement: DslSunElement,
    pos: "before" | "after",
  ) {
    const childImpl = Base(child, posElement.parent)
    const children = posElement.parent.children
    const insertPlace = children.findIndex(originEle => originEle === posElement)
    const offset = pos === "after" ? 1 : 0
    children.splice(insertPlace + offset, 0, childImpl)
    return childImpl
  }

  function removeElement(child: DslSunElement) {
    const siblings = child.parent.children
    const delIdx = siblings.findIndex(originEle => originEle === child)
    siblings.splice(delIdx, 1)
    clearMap(child.id)
    child.children?.forEach(({ id }) => clearMap(id))
  }

  // selected box 点击的组件
  let selectedElementId = ref<string>("")
  function setSelectedElement(comp: { id: string }) {
    selectedElementId.value = comp.id
  }
  const [isShowSelectorPos, toggleShowSelectorPos] = useToggle(false)
  const [selectorPos, setSelectorPos, clearSelectorPos] = clearableReactive(
    (): StyleLike => ({ left: -100, top: -100, height: 0, width: 0 }),
    {
      onClear() { toggleShowSelectorPos(false) },
      onSet() { setTimeout(() => toggleShowSelectorPos(true)) },
    },
  )

  const selectedElement = ref<HTMLElement | undefined>()

  watch([selectedElementId, root], () => {
    selectedElement.value = implList.get(selectedElementId.value)?.el as HTMLElement | undefined
  }, { immediate: true })

  const selectedElementBounding = useElementBounding(selectedElement)
  watchEffect(() => {
    if (selectedElementBounding.left.value === 0 && selectedElementBounding.top.value === 0) {
      clearSelectorPos()
    } else {
      setSelectorPos({
        left: selectedElementBounding.left.value,
        top: selectedElementBounding.top.value,
        height: selectedElementBounding.height.value,
        width: selectedElementBounding.width.value,
      })
    }
  })

  // posPrompt
  type PosPrompt = StyleLike & { type: "left" | "right" | "top" | "bottom" }
  // 前后还是上下插入
  const [posPrompt, setPosPrompt, clearPosPrompt] = clearableReactive(
    (): PosPrompt => ({ left: -100, top: -100, width: 0, height: 0, type: "left" }),
  )

  // hover-helper
  const [hoverHelper, setHoverHelper, clearHoverHelper] = clearableReactive(
    (): StyleLike => ({ left: -100, top: -100, width: 0, height: 0 }),
  )

  // dsl export
  const dslString = watchComputed([root], () => {
    return JSON.stringify(root, ["id", "type", "children"], 2)
  })

  return {
    root,
    appendElement,
    insertElement,
    selectedElementId,
    setSelectedElement,
    isShowSelectorPos,
    selectorPos,
    dslString,
    removeElement,
    posPrompt,
    setPosPrompt,
    clearPosPrompt,
    hoverHelper,
    setHoverHelper,
    clearHoverHelper,
  }
})
