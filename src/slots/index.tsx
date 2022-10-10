import type * as Slot from "./Input"
import type { allSlotsKey } from "@/models/slots"
import { allSlots } from "@/models/slots"

let c: Record<string, typeof Slot> = import.meta.glob("./*.tsx", { eager: true })

export const Slots: Map<allSlotsKey, typeof Slot["Component"] > = new Map()
export const Props: Map<allSlotsKey, typeof Slot["Prop"] > = new Map()

Object.values(c).forEach(({ Component, Prop }) => {
  // @ts-expect-error let me do
  Slots.set(allSlots[Component.name], Component)
  // @ts-expect-error let me do
  Props.set(allSlots[Component.name], Prop)
})
