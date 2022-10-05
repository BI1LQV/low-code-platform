import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { Options, Styles } from "@/models"

export default function Input(binder: Ref<any>, _prop: Options, _style: Styles) {
  return defineComponent(() => () => (
    <div>
      <input class="border-1 border-black" type="text"
        v-model={binder.value}
       />
       <div>{binder.value}</div>
    </div>
  ))
}

