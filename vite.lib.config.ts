import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "YxyEasyLib",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "ant-design-vue",
        "element-plus",
        "@ant-design/icons-vue",
        "echarts",
        "element-resize-detector",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "ant-design-vue": "AntDesignVue",
          "element-plus": "ElementPlus",
          "@ant-design/icons-vue": "AntDesignIconsVue",
        },
        // 保留模块结构
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
});
