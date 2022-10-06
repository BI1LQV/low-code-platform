import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { Options, Styles } from "@/models"
export const name = "input"
export function Component(binder: Ref<any>, prop: Options, style: Styles) {
  return defineComponent(() => () => (
    <div>
      <input class="border-1 border-black" type="text"
        v-model={binder.value}
        style={style}
        props={prop}
       />
       <div>{binder.value}</div>
    </div>
  ))
}

export function Style() {
  return {}
}

export function Prop() {
  return {}
}
