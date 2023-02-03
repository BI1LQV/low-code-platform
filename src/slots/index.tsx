import type * as Slot from "./EFlex"
import type { allSlotsKey } from "@/models/slots"
import { allSlots } from "@/models/slots"

let c: Record<string, typeof Slot> = import.meta.glob("./*.tsx", { eager: true })

export const Slots: Map<allSlotsKey, typeof Slot["Component"] > = new Map()
export const Props: Map<allSlotsKey, typeof Slot["Prop"] > = new Map()
export const Binders: Map<allSlotsKey, typeof Slot["Binder"] > = new Map()
export const StylePanels: Map<allSlotsKey, typeof Slot["StylePanel"] | undefined > = new Map()
export const AttrPanels: Map<allSlotsKey, typeof Slot["AttrPanel"] | undefined > = new Map()

Object.entries(c).forEach(([name, { Component, Prop, StylePanel, AttrPanel, Binder }]) => {
  // @ts-expect-error let me do
  const compName = /(?<compName>E\w+).tsx/[Symbol.match](name).groups.compName
  // @ts-expect-error let me do
  Slots.set(allSlots[compName], Component)
  // @ts-expect-error let me do
  Props.set(allSlots[compName], Prop)
  // @ts-expect-error let me do
  Binders.set(allSlots[compName], Binder)
  // @ts-expect-error let me do
  StylePanels.set(allSlots[compName], StylePanel)
  // @ts-expect-error let me do
  AttrPanels.set(allSlots[compName], AttrPanel)
})
