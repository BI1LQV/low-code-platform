import { defineStore } from "pinia"
import type { Ref } from "vue"
import { ref } from "vue"
import { useLocalStorage } from "@vueuse/core"
import { useLoadingStore } from "./loadingStore"
import type { TemplateItem } from "@/models/lists"
import { wrappedFetch } from "@/utils/wrappedFetch"

export const useTemplateListStore = defineStore("templateList", () => {
  const loadingStore = useLoadingStore()
  const loadError = ref("")
  const templateList = ref<TemplateItem[]>([])

  function getTemplateList() {
    loadingStore.setGlobalLoader("template_list_load",
      wrappedFetch("/api/getTemplateList")
        .then((res) => {
          templateList.value = res
        }).catch((err) => {
          loadError.value = err
        }))
  }

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

  function toggleDisplay(id: number, loading?: Ref<boolean>) {
    return wrappedFetch(
      `/api/toggleDisplay?id=${id}`, { loading }).then((res) => {
      return res
    })
  }
  return {
    loadError,
    templateList,
    getTemplateList,
    deleteTemplate,
    author,
    addTemplate,
    toggleDisplay,
  }
})
