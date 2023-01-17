import { defineStore } from "pinia"
import type { Ref } from "vue"
import { ref } from "vue"
import { useLocalStorage } from "@vueuse/core"
import type { TemplateItem } from "@/models/lists"
import { wrappedFetch } from "@/utils/wrappedFetch"

export const useTemplateListStore = defineStore("templateList", () => {
  const loading = ref(true)
  const loadError = ref("")
  const templateList = ref<TemplateItem[]>([])

  function getTemplateList() {
    wrappedFetch(loading, "/api/getTemplateList")
      .then((res) => {
        templateList.value = res
      }).catch((err) => {
        loadError.value = err
      })
  }

  function deleteTemplate(id: number, loading?: Ref<boolean>) {
    return wrappedFetch(loading, `/api/deleteTemplate?id=${id}`).then((res) => {
      getTemplateList()
      return res
    })
  }

  const author = useLocalStorage("author", "")

  function addTemplate(name: string, author: string, loading?: Ref<boolean>) {
    return wrappedFetch(loading,
      `/api/addTemplate?name=${name}&author=${author}`).then((res) => {
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
