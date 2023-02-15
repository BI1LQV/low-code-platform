import { reactive } from "vue"
import type { LoadStatus } from "@/models/status"

export const pyodideLoading = reactive<Record<string, LoadStatus >>({})
