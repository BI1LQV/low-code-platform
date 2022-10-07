import { defineComponent, ref, watch } from "vue"
import { toRefs } from "@vueuse/core"
import { useCanvasStore } from "@/store"
import { Slots } from "@/slots"
import type { dslContainerElement, dslRootElement } from "@/models"
import { isParent } from "@/models"

export default defineComponent(() => {
  const { dsl, binderList, propList } = useCanvasStore()

  let compList = ref()
  watch(dsl, () => {
    function genCompList(dsl: dslContainerElement | dslRootElement) {
      return dsl.children.map((ele) => {
        const { type, id, children } = toRefs(ele)
        const Element = Slots.get(type.value)!
        if (children) {
          return (<Element
              binder={binderList.get(id.value)!}
              prop={propList.get(id.value)!}
              key={Math.random()}
            >
              {children.value!.map((comp) => {
                if (isParent(comp)) {
                  return genCompList(comp)
                } else {
                  const { id, type } = toRefs(comp)
                  const Element = Slots.get(type.value)!
                  return (
                  <Element
                    binder={binderList.get(id.value)!}
                    prop={propList.get(id.value)!}
                    key={Math.random()}
                  />)
                }
              })}
            </Element>)
        } else {
          return (<Element
            binder={binderList.get(id.value)!}
            prop={propList.get(id.value)!}
            key={Math.random()}
          />)
        }
      })
    }
    compList.value = genCompList(dsl)
  })
  return () => (
    <div class="w-800px border-3px">
     { compList.value }
    </div>
  )
})

