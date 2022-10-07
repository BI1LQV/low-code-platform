import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { SlotOptions } from "@/models"
export const name = "flex"
export const Component = defineComponent({
  name: "Flex",
  props: ["binder", "prop"],
  setup(
    { binder: _binder, prop: _prop }: { binder: Ref<any>; prop: SlotOptions },
    { slots },
  ) {
    return () => {
      let slotComp = slots.default?.()[0].children
      return (<div class="min-h-10px w-100% border-2px m-5px">
        container:
      {slotComp || null}
          </div>)
    }
  },
})

export function Style() {
  return {}
}

export function Prop() {
  return {}
}
