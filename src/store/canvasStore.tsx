import { defineStore } from "pinia"
import type { Ref } from "vue"
import { reactive, ref, shallowReactive, watch } from "vue"
import { useElementBounding, useToggle } from "@vueuse/core"
import type { DslBaseElement, DslContainerElement, DslRootElement, DslSunElement, MaybeParent, SlotOptions, allSlotsKey } from "@/models/slots"
import { containerSlots, rootID } from "@/models/slots"
import { genId, setParent } from "@/utils"
import { Binders, Props } from "@/slots"
import type { MoveSlotDragger, NewSlotDragger, StyleLike } from "@/models/drags"
import { clearableReactive } from "@/composables/clearableReactive"

export const useCanvasStore = defineStore("canvasStore", () => {
  const binderList: Map<string, Ref<any>> = shallowReactive(new Map())
  const propList: Map<string, SlotOptions> = shallowReactive(new Map())
  const implList: Map<string, JSX.Element> = shallowReactive(new Map())
  const dslList: Map<string, DslContainerElement | DslSunElement | DslBaseElement> = shallowReactive(new Map())

  function clearMap(id: string) {
    dslList.delete(id)
    implList.delete(id)
    propList.delete(id)
    binderList.delete(id)
  }

  // dsl tree
  const root: DslRootElement = reactive({
    children: [],
    type: containerSlots.ERoot,
    id: rootID,
  })

  propList.set(rootID, Props.get(containerSlots.ERoot)!())
  dslList.set(rootID, root)
  function Base(
    type: allSlotsKey, parent: MaybeParent,
  ): DslSunElement {
    const id = genId()
    const prop = reactive(Props.get(type)!())
    const binder = Binders.get(type)!()
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

  function getMaybeImpl(data: NewSlotDragger | MoveSlotDragger, parent: MaybeParent): DslSunElement {
    let childImpl: DslSunElement
    if (data.type === "moveSlot") {
      childImpl = dslList.get(data.id) as DslSunElement
      removeElement(childImpl, true)
      childImpl.parent = parent
    } else {
      childImpl = Base(data.slot, parent)
    }
    return childImpl
  }

  function insertElement(data: NewSlotDragger | MoveSlotDragger, parent: MaybeParent) {
    const childImpl = getMaybeImpl(data, parent)
    parent.children.push(childImpl)
    return childImpl
  }

  function appendElement(
    data: NewSlotDragger | MoveSlotDragger,
    posElement: DslSunElement,
    pos: "before" | "after",
  ) {
    const childImpl = getMaybeImpl(data, posElement.parent)
    const children = posElement.parent.children
    const insertPlace = children.findIndex(originEle => originEle.id === posElement.id)
    const offset = pos === "after" ? 1 : 0
    children.splice(insertPlace + offset, 0, childImpl)
    return childImpl
  }

  function removeElement(child: DslSunElement, isTemp = false) {
    const siblings = child.parent.children
    const delIdx = siblings.findIndex(originEle => originEle.id === child.id)
    siblings.splice(delIdx, 1)
    if (!isTemp) {
      clearMap(child.id)
      child.children?.forEach(({ id }) => clearMap(id))
    }
  }

  function saveDSL() {
    return {
      children: JSON.stringify(root.children, ["id", "type", "children"]),
      propList: JSON.stringify(Array.from(propList)),
      binderList: JSON.stringify(Array.from(binderList).map(([key, value]) => [key, value.value])),
    }
  }
  function loadDSL(dslString: ReturnType<typeof saveDSL>) {
    const loadedPropList = JSON.parse(dslString.propList)
    const loadedBinderList = JSON.parse(dslString.binderList)
    const loadedChildren = JSON.parse(dslString.children)
    propList.clear()
    binderList.clear()
    dslList.clear()
    implList.clear()

    loadedPropList.forEach(([key, value]: [ string, object ]) => {
      propList.set(key, reactive(value))
    })

    loadedBinderList.forEach(([key, value]: [ string, any ]) => {
      binderList.set(key, ref(value))
    })

    const children = reactive(loadedChildren)
    setParent(root, children, sun => dslList.set(sun.id, sun))
    root.children = children
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

  {
    const { left, top, height, width } = useElementBounding(selectedElement)
    watch([left, top, height, width], () => {
      if (left.value === 0 && top.value === 0) {
        clearSelectorPos()
      } else {
        setSelectorPos({
          left: left.value - 6,
          top: top.value - 6,
          height: height.value + 12,
          width: width.value + 12,
        })
      }
    })
  }

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
  function clearDragEffect() {
    clearPosPrompt()
    clearHoverHelper()
  }

  const INIT_STORE = saveDSL()
  function reset() {
    loadDSL(INIT_STORE)
  }

  return {
    root,
    appendElement,
    insertElement,
    selectedElementId,
    setSelectedElement,
    isShowSelectorPos,
    selectorPos,
    removeElement,
    posPrompt,
    setPosPrompt,
    clearPosPrompt,
    hoverHelper,
    setHoverHelper,
    clearHoverHelper,
    saveDSL,
    loadDSL,
    clearDragEffect,
    binderList,
    propList,
    implList,
    dslList,
    clearMap,
    reset,
  }
})
