import type { allSlotsKey } from "./slots"

export interface NewSlotDragger {
  type: "newSlot"
  slot: allSlotsKey
}

export interface MoveSlotDragger {
  type: "moveSlot"
  id: string
}
