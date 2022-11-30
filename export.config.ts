import { defineExportConfig } from "vite-plugin-hot-export"
export default defineExportConfig({
  configs: [
    {
      targetDir: "./src/assets/stylePanel",
      autoPrefix: true,
    },
  ],
})
