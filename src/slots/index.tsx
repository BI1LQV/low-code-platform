import type * as Slot from "./Input"

let c: Record<string, typeof Slot> = import.meta.glob("./*.tsx", { eager: true })

export const Slots: Map<string, typeof Slot["Component"] > = new Map()
export const Styles: Map<string, typeof Slot["Style"] > = new Map()
export const Props: Map<string, typeof Slot["Prop"] > = new Map()

Object.values(c).forEach(({ Component, Style, Prop, name }) => {
  Slots.set(name, Component)
  Styles.set(name, Style)
  Props.set(name, Prop)
})
