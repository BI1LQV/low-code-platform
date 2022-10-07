import type * as Slot from "./Input"
import type { allSlotsKey } from "@/models"
import { allSlots } from "@/models"

let c: Record<string, typeof Slot> = import.meta.glob("./*.tsx", { eager: true })

export const Slots: Map<allSlotsKey, typeof Slot["Component"] > = new Map()
export const Styles: Map<allSlotsKey, typeof Slot["Style"] > = new Map()
export const Props: Map<allSlotsKey, typeof Slot["Prop"] > = new Map()

Object.values(c).forEach(({ Component, Style, Prop }) => {
  // @ts-expect-error let me do
  Slots.set(allSlots[Component.name], Component)
  // @ts-expect-error let me do
  Styles.set(allSlots[Component.name], Style)
  // @ts-expect-error let me do
  Props.set(allSlots[Component.name], Prop)
})
