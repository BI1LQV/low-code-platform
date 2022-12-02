import type { FuncType } from "@/models/funcCalls"
import { jsFuncPool } from "@/store/funcStore"

export function callFunc(func: FuncType, payload: {}) {
  if (func.type === "js") {
    (jsFuncPool.get(func.name)!)(payload)
  }
}
