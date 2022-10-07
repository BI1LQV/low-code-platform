import { computed, defineComponent } from "vue"
import { useCanvasStore } from "@/store"
import { Slots } from "@/slots"

export default defineComponent(() => {
  const { dsl, binderList, propList } = useCanvasStore()

  let compList = computed(() => {
    let list = []
    for (const { type, id } of dsl.children) {
      const Element = Slots.get(type)!
      list.push(
      <Element
         binder={binderList.get(id)!}
         prop={propList.get(id)!}
      />)
    }
    return list
  })
  return () => (
    <div w-800px border-3px>
     { compList.value }
    </div>
  )
})

