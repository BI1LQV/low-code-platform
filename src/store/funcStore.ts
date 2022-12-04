import { defineStore } from "pinia"

export const jsFuncPool = new Map<string, (args: {}) => void>()
export const bindingStore = defineStore("bindingStore", () => {

})
