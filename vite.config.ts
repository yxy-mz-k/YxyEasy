import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/

export default defineConfig({
  plugins: [vue()],
  build: {
    // outDir: "dist", //输出文件名
    // 库编译模式配置
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.js"), //指定组件编译入口文件
      name: "YxyEasy",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "vue",
        "ant-design-vue",
        "echarts",
        "element-plus",
        "sass",
        "sortablejs",
        "splitpanes",
        "vue-router",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "ant-design-vue": "AntDesignVue",
          echarts: "Echarts",
          "element-plus": "ElementPlus",
          sass: "Sass",
          sortablejs: "Sortablejs",
          splitpanes: "Splitpanes",
          "vue-router": "VueRouter",
        },
      },
    },
  },
});
