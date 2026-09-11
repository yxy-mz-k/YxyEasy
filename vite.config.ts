import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx"; // 添加这个
// import path from "path";
import { resolve } from "path";
// import glob from "vite-plugin-glob";
// import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { generateModifyVars } from "./src/utils/generateModifyVars";
import { createVitePlugins } from "./src/utils/build/index";

export default defineConfig({
  plugins: createVitePlugins(),
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
      formats: ["es"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        /^@ant-design\/colors($|\/)/,
        /^@ant-design\/icons-vue($|\/)/,
        /^@geoman-io\/leaflet-geoman-free($|\/)/,
        /^@iconify\/iconify($|\/)/,
        /^@logicflow\/core($|\/)/,
        /^@logicflow\/extension($|\/)/,
        /^@vue\/runtime-core($|\/)/,
        /^@vue\/shared($|\/)/,
        /^@vueuse\/core($|\/)/,
        /^@vueuse\/components($|\/)/,
        /^@vueuse\/shared($|\/)/,
        /^@zxcvbn-ts\/core($|\/)/,
        /^ant-design-vue($|\/)/,
        /^axios($|\/)/,
        /^browserslist($|\/)/,
        /^cesium($|\/)/,
        /^cesium-navigation-es6($|\/)/,
        /^codemirror($|\/)/,
        /^cropperjs($|\/)/,
        /^crypto-js($|\/)/,
        /^dayjs($|\/)/,
        /^echarts($|\/)/,
        /^element-plus($|\/)/,
        /^element-resize-detector($|\/)/,
        /^intro.js($|\/)/,
        /^jquery($|\/)/,
        /^leaflet($|\/)/,
        /^leaflet.chinatmsproviders($|\/)/,
        /^lodash-es($|\/)/,
        /^miniprogram-sm-crypto($|\/)/,
        /^mitt($|\/)/,
        /^mockjs($|\/)/,
        /^nprogress($|\/)/,
        /^path-to-regexp($|\/)/,
        /^pinia($|\/)/,
        /^print-js($|\/)/,
        /^qrcode($|\/)/,
        /^qs($|\/)/,
        /^resize-observer-polyfill($|\/)/,
        /^showdown($|\/)/,
        /^sortablejs($|\/)/,
        /^splitpanes($|\/)/,
        /^tinymce($|\/)/,
        /^vditor($|\/)/,
        /^vite-plugin-cesium($|\/)/,
        /^vue($|\/)/,
        /^vue-clipboard3($|\/)/,
        /^vue-i18n($|\/)/,
        /^vue-json-pretty($|\/)/,
        /^vue-router($|\/)/,
        /^vue-signature-pad($|\/)/,
        /^vue-types($|\/)/,
        /^vue3-colorpicker($|\/)/,
        /^vue3-draggable-resizable($|\/)/,
        /^vue3-json-viewer($|\/)/,
        /^ws($|\/)/,
        /^xlsx($|\/)/,
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // globals: {
        //   vue: "Vue",
        //   "ant-design-vue": "AntDesignVue",
        //   echarts: "Echarts",
        //   "element-plus": "ElementPlus",
        //   sass: "Sass",
        //   sortablejs: "Sortablejs",
        //   splitpanes: "Splitpanes",
        //   "vue-router": "VueRouter",
        //   dayjs: "dayjs",
        //   "lodash-es": "_",
        // },
        // 保持模块结构
        // preserveModules: true,
        // preserveModulesRoot: "src",

        // 确保 CSS 被提取
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "style.css";
          }
          return assetInfo.name;
        },
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
    cssTarget: "chrome80",
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
  define: {
    __INTLIFY_PROD_DEVTOOLS__: false,
    // __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  // optimizeDeps: {
  //   // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
  //   include: [
  //     "@vue/runtime-core",
  //     "@vue/shared",
  //     "@iconify/iconify",
  //     "ant-design-vue/es/locale/zh_CN",
  //     "ant-design-vue/es/locale/en_US",
  //   ],
  // },
  server: {
    // https: false,
    // Listening on all local IPs
    // host: true,
    // port: VITE_PORT,
    // Load proxy configuration from .env
  },
});
