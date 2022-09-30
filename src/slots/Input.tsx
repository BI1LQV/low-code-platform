import { reactive } from "vue"
import type { Options } from "@/models"

export default function Input(): [() => JSX.Element, Options] {
  const data: Options = reactive({
    value: "a",
  })

  return [() => (
    <div>
      <input class="border-1 border-black" type="text"
        v-model={data.value}
       />
       <div>{data.value}</div>
    </div>
  ), data]
}

