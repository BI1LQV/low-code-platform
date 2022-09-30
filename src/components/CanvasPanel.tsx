import { defineComponent, h } from "vue"
import Input from "@/slots/Input"
export default defineComponent(() => {
  const [Comp, data] = Input()
  console.log(Comp, data)
  return () => (
    <div w-800px border-3px>
      abc
     { h(Comp) }
    </div>
  )
})

