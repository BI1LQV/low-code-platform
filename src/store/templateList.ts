import { defineStore } from "pinia"
import type { Ref } from "vue"
import { ref } from "vue"
import { useLocalStorage } from "@vueuse/core"
import { useLoadingStore } from "./loadingStore"
import type { TemplateItem } from "@/models/lists"
import { wrappedFetch } from "@/utils/wrappedFetch"

export const useTemplateListStore = defineStore("templateList", () => {
  const loadingStore = useLoadingStore()
  const loading = ref(true)
  const loadError = ref("")
  const templateList = ref<TemplateItem[]>([])

  function getTemplateList() {
    wrappedFetch("/api/getTemplateList", { loading })
      .then((res) => {
        templateList.value = res
      }).catch((err) => {
        loadError.value = err
      })
  }

  loadingStore.setGlobalLoader("template_list_load", loading)

  function deleteTemplate(id: number, loading?: Ref<boolean>) {
    return wrappedFetch(`/api/deleteTemplate?id=${id}`, { loading }).then((res) => {
      getTemplateList()
      return res
    })
  }

  const author = useLocalStorage("author", "")

  function addTemplate(name: string, author: string, loading?: Ref<boolean>) {
    return wrappedFetch(
      `/api/addTemplate?name=${name}&author=${author}`, { loading }).then((res) => {
      getTemplateList()
      return res
    })
  }
  return {
    loading,
    loadError,
    templateList,
    getTemplateList,
    deleteTemplate,
    author,
    addTemplate,
  }
})
