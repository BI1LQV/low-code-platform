import { defineStore } from "pinia"
import { ref } from "vue"
import type { TemplateItem } from "@/models/lists"

export const useTemplateListStore = defineStore("templateList", () => {
  const loading = ref(true)
  const loadError = ref(false)
  const templates = ref<TemplateItem[]>([])

  function getTemplates() {
    loading.value = true
    fetch("/api/getTemplates")
      .then(res => res.json())
      .then(res => templates.value = res).catch((err) => {
        loadError.value = true
        console.log(err)
      }).then(() => {
        loading.value = false
      })
  }

  return {
    loading,
    loadError,
    templates,
    getTemplates,
  }
})
