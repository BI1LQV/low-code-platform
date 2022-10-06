import type * as Slot from "./Input"
import type { allSlotsKey } from "@/models"
import { allSlots } from "@/models"

let c: Record<string, typeof Slot> = import.meta.glob("./*.tsx", { eager: true })

export const Slots: Map<allSlotsKey, typeof Slot["Component"] > = new Map()
export const Styles: Map<allSlotsKey, typeof Slot["Style"] > = new Map()
export const Props: Map<allSlotsKey, typeof Slot["Prop"] > = new Map()

Object.values(c).forEach(({ Component, Style, Prop, name }) => {
  Slots.set(allSlots[name], Component)
  Styles.set(allSlots[name], Style)
  Props.set(allSlots[name], Prop)
})
