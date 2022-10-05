import type { Ref } from "vue"
import { defineComponent, ref } from "vue"
import Slots from "@/slots"
export default defineComponent(() => {
  const dsl: Record<string, string>[] = [
    { type: "input", id: "1" },
    { type: "input", id: "2" },
    { type: "input", id: "3" },
  ]
  let compList: (JSX.Element)[] = []
  let binderList: Map<string, Ref<any>> = new Map([
    ["1", ref(1)],
    ["2", ref(1)],
    ["3", ref(1)],
  ])
  for (const { type, id } of dsl) {
    const Element = Slots[(type as "input")](binderList.get(id)!, {}, {})
    compList.push(<Element></Element>)
  }

  return () => (
    <div w-800px border-3px>
     { compList }
    </div>
  )
})

