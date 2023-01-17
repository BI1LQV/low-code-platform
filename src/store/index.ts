import type { Ref } from "vue"
import { useCanvasStore } from "./canvasStore"
import { useFuncStore } from "./funcStore"
import { wrappedFetch } from "@/utils/wrappedFetch"

export function exportString() {
  return JSON.stringify({
    ...useCanvasStore().saveDSL(),
    ...useFuncStore().saveFunc(),
  })
}
export function importString(str: string) {
  const dsl = JSON.parse(str)
  useCanvasStore().loadDSL(dsl)
  useFuncStore().loadFunc(dsl)
}

export function downloadString(id: number | string, loading?: Ref<boolean>) {
  return wrappedFetch(loading, `/api/getTemplate?id=${id}`).then((res) => {
    // eslint-disable-next-line no-throw-literal
    if (!res.data) { throw ("空模板") }
    importString(res.data)
  })
}

export function uploadString(id: number | string, data: string, loading?: Ref<boolean>) {
  return wrappedFetch(loading, `/api/updateTemplate?id=${id}`, {
    method: "post",
    body: data,
  })
}
