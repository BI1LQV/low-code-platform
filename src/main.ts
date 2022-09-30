import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import routes from "virtual:generated-pages"
import App from "./App.vue"
import now from "~build/time"
import { commitMessage, sha } from "~build/info"

import "@unocss/reset/tailwind.css"
import "./styles/main.css"
import "uno.css"

if (!import.meta.env.DEV) {
  console.log("BUILD INFO")
  console.log("build time:", now)
  console.log("commit msg:", commitMessage)
  console.log("version:", sha)
}

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount("#app")
