import type { Ref } from "vue"
import { defineComponent, nextTick, shallowRef, watch } from "vue"
import mpld3 from "mpld3"
import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"
import { genId } from "@/utils"

export const Component = defineComponent({
  name: "Matplot容器",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    const id = `E${genId().replaceAll("-", "")}`
    watch([binder, prop], () => {
      nextTick(() => {
        const el = document.getElementById(id)
        if (el && !("empty" in binder.value)) {
          el.innerHTML = ""
          const { width, height } = el.getBoundingClientRect()
          console.log(width, height)
          mpld3.draw_figure(id, { ...binder.value, width, height })
        }
      })
    }, { immediate: true })
    return () => {
      return <div {...prop} id={id}>无图像</div>
    }
  },
})

export function Prop(): CommonOptions {
  return {
    "style": {
      ...BaseStyleImpl(),
      "width": "50%",
      "height": "200px",
    },
  }
}

export function Binder() {
  return shallowRef({ empty: true })
}
