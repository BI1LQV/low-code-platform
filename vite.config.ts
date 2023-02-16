/// <reference types="vitest" />

import path from "path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import VueJsx from "@vitejs/plugin-vue-jsx"
import Pages from "vite-plugin-pages"
import Unocss from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import BuildInfo from "vite-plugin-info"
import Inspect from "vite-plugin-inspect"
import VueMacros from "unplugin-vue-macros/vite"
import HotExport from "vite-plugin-hot-export"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://lowcode.birdu.net",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    BuildInfo(),
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(),
      },
    }),
    Inspect(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      importMode(_filepath) {
        // if (
        //   filepath === "/src/pages/preview/index.vue"
        // || filepath === "/src/pages/editor/index.vue"
        // ) {
        //   return "async"
        // }
        return "sync"
      },
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: [],
    }),
    HotExport(),
    visualizer(),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom",
  },
  worker: {
    format: "es",
  },
  build: {
    target: "chrome89",
  },
})
