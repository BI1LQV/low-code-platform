import { defineStore } from "pinia"
import { ref } from "vue"
import type { TemplateItem } from "@/models/lists"
import { wrappedFetch } from "@/utils/wrappedFetch"

export const useTemplateListStore = defineStore("templateList", () => {
  const loading = ref(true)
  const loadError = ref("")
  const templateList = ref<TemplateItem[]>([])

  function getTemplateList() {
    loading.value = true
    wrappedFetch("/api/getTemplateList")
      .then((res) => {
        templateList.value = res
      }).catch((err) => {
        loadError.value = err
      }).then(() => {
        loading.value = false
      })
  }

  return {
    loading,
    loadError,
    templateList,
    getTemplateList,
  }
})
