import "@unocss/reset/tailwind.css"
import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { createPinia } from "pinia"
import routes from "virtual:generated-pages"
import App from "./App.vue"
import now from "~build/time"
import { sha } from "~build/info"

import "./styles/main.css"
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

if (!(import.meta.env.MODE === "test")) {
  app.mount("#app")
}

