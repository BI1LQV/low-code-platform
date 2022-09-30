import { defineComponent, reactive } from "vue"
import type { Options } from "@/models"

export default function Input() {
  const data: Options = reactive({
    value: "a",
  })

  return {
    Elements: defineComponent(() => () => (
    <div>
      <input class="border-1 border-black" type="text"
        v-model={data.value}
       />
       <div>{data.value}</div>
    </div>
    )),
    props: data,
  }
}

