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

export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    BuildInfo(),
    VueMacros({
      plugins: {
        vue: Vue({ reactivityTransform: true }),
        vueJsx: VueJsx(),
      },
    }),
    Inspect(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      importMode(_filepath, _options) {
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
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom",
  },
})
