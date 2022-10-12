import type { allSlotsKey } from "./slots"

export interface NewSlotDragger {
  type: "newSlot"
  slot: allSlotsKey
}

export interface MoveSlotDragger {
  type: "moveSlot"
  id: string
}

export type StyleLike = Record<"left" | "top" | "width" | "height", number>
