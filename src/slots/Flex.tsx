import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { SlotOptions } from "@/models"
export const Component = defineComponent({
  name: "EFlex",
  props: ["binder", "prop"],
  setup(
    { prop }: { binder: Ref<any>; prop: SlotOptions },
    { slots },
  ) {
    return () => {
      return (
        <div class="min-h-10px w-100% border-2px m-5px" props={prop}>
          {slots.default?.()[0].children}
        </div>
      )
    }
  },
})

export function Style() {
  return {}
}

export function Prop() {
  return {}
}
