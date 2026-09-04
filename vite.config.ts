import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 添加这个
// import path from "path";
import { resolve } from "path";
import glob from "vite-plugin-glob";

// https://vite.dev/config/

export default defineConfig({
  plugins: [vue(), vueJsx(), glob()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      api: resolve(__dirname, "./src/api"),
      assets: resolve(__dirname, "./src/assets"),
      components: resolve(__dirname, "./src/components"),
      design: resolve(__dirname, "./src/design"),
      directives: resolve(__dirname, "./src/directives"),
      enums: resolve(__dirname, "./src/enums"),
      hooks: resolve(__dirname, "./src/hooks"),
      layouts: resolve(__dirname, "./src/layouts"),
      locales: resolve(__dirname, "./src/locales"),
      logics: resolve(__dirname, "./src/logics"),
      plugins: resolve(__dirname, "./src/plugins"),
      router: resolve(__dirname, "./src/router"),
      settings: resolve(__dirname, "./src/settings"),
      store: resolve(__dirname, "./src/store"),
      styles: resolve(__dirname, "./src/styles"),
      types: resolve(__dirname, "./src/types"),
      utils: resolve(__dirname, "./src/utils"),
      views: resolve(__dirname, "./src/views"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".tsx", ".json", ".vue"],
  },
  build: {
    // outDir: "dist", //输出文件名
    // 库编译模式配置
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "YxyEasy",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"],
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
        "@ant-design/icons-vue",
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
          dayjs: "dayjs",
          "lodash-es": "_",
        },
        // 保持模块结构
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    }, // 压缩选项
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 生成 sourcemap
    sourcemap: true,
    // CSS 处理
    cssCodeSplit: false,
  },
});
