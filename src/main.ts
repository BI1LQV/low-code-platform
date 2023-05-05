import "@unocss/reset/tailwind.css"
import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { createPinia } from "pinia"
import routes from "virtual:generated-pages"
import { ElMessage } from "element-plus"
import App from "./App.vue"
import now from "~build/time"
import { sha } from "~build/info"

import "./styles/main.css"
import "element-plus/es/components/message/style/css"
import "uno.css"

if (!import.meta.env.DEV) {
  console.log("BUILD INFO")
  console.log("build time:", now)
  console.log("version:", sha)
}

export const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
const pinia = createPinia()
app.use(pinia)

window.onunhandledrejection = (rejPromise) => {
  ElMessage({
    type: "error",
    message: rejPromise.reason,
    duration: 0,
    showClose: true,
  })
}

if (!(import.meta.env.MODE === "test")) {
  app.mount("#app")
}

