import { defineComponent, h } from "vue"
import Slots from "@/slots"
import type { Options } from "@/models"
export default defineComponent(() => {
  const dsl: Record<"type", "input">[] = [
    { type: "input" },
    { type: "input" },
    { type: "input" },
  ]
  let compList: (JSX.Element)[] = []
  let dataList: Options[] = []
  for (const { type } of dsl) {
    const [Comp, data] = Slots[type]()
    compList.push(h(Comp))
    dataList.push(data)
  }
  setTimeout(() => {
    dataList.forEach((data) => {
      data.value = 2
    })
  }, 1000)
  return () => (
    <div w-800px border-3px>
     { compList }
    </div>
  )
})

