import type { Ref } from "vue"

export enum LoadStatus {
  "OK",
  "ERR",
  "LOAD",
}

export type MaybeStatus = Ref<LoadStatus> | Promise<any> | Ref<boolean>
