import type { ComputedRef, Ref } from "vue"
import { computed, defineComponent, reactive, ref } from "vue"
import Slots from "@/slots"
export default defineComponent(() => {
  const dsl: Record<string, string>[] = reactive([
    { type: "input", id: "1" },
    { type: "input", id: "2" },
    { type: "input", id: "3" },
  ])

  let binderList: Map<string, Ref<any>> = new Map([
    ["1", ref(1)],
    ["2", ref(1)],
    ["3", ref(1)],
  ])
  let compList: ComputedRef<(JSX.Element)[]> = computed(() => {
    let list = []
    for (const { type, id } of dsl) {
      const Element = Slots[(type as "input")](binderList.get(id)!, {}, { height: "200px" })
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

