import type * as Slot from "./Flex"
import type { allSlotsKey } from "@/models/slots"
import { allSlots } from "@/models/slots"

let c: Record<string, typeof Slot> = import.meta.glob("./*.tsx", { eager: true })

export const Slots: Map<allSlotsKey, typeof Slot["Component"] > = new Map()
export const Props: Map<allSlotsKey, typeof Slot["Prop"] > = new Map()
export const StylePanels: Map<allSlotsKey, typeof Slot["StylePanel"] | undefined > = new Map()

Object.values(c).forEach(({ Component, Prop, StylePanel }) => {
  // @ts-expect-error let me do
  Slots.set(allSlots[Component.name], Component)
  // @ts-expect-error let me do
  Props.set(allSlots[Component.name], Prop)
  // @ts-expect-error let me do
  StylePanels.set(allSlots[Component.name], StylePanel)
})
