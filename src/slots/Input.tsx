import type { Component } from "vue"
import { defineComponent, reactive } from "vue"
import type { Options } from "@/models"

export default function Input(): [Component, Options] {
  const data: Options = reactive({
    value: "a",
  })

  return [defineComponent(() => () => (
    <div>
      <input class="border-1 border-black" type="text"
        v-model={data.value}
       />
       <div>{data.value}</div>
    </div>
  )), data]
}

