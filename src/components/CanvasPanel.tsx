import type { ComputedRef } from "vue"
import { computed, defineComponent } from "vue"
import { useCanvasStore } from "@/store"
import Slots from "@/slots"

export default defineComponent(() => {
  const { dsl, binderList, propList, styleList } = useCanvasStore()
  let compList: ComputedRef<(JSX.Element)[]> = computed(() => {
    let list = []
    for (const { type, id } of dsl.children) {
      const Element = Slots[(type as "input")](
        binderList.get(id)!, propList.get(id)!, styleList.get(id)!,
      )
      list.push(<Element></Element>)
    }
    return list
  })
  return () => (
    <div w-800px border-3px>
     { compList.value }
    </div>
  )
})

