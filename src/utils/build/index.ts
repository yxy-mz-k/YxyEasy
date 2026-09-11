import { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import glob from "vite-plugin-glob";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

// import windiCSS from "vite-plugin-windicss";
// import { configHtmlPlugin } from "./html";
// import { configSvgIconsPlugin } from "./svgSprite";
// import { configStyleImportPlugin } from "./styleImport";
// import { configPwaConfig } from "./pwa";

// import { getGlobalConfig } from "../global";
export function createVitePlugins() {
  // let globalConfig = getGlobalConfig();
  // const isBuild = !globalConfig?.isEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    glob(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      // 指定 symbolId 格式
      symbolId: "icon-[dir]-[name]",
      // 自定义插入位置
      inject: "body-last",
      // 自定义 domId
      customDomId: "__svg__icons__dom__",
    }),
  ];
  // vitePlugins.push(windiCSS());
  // vitePlugins.push(configHtmlPlugin());
  // vitePlugins.push(configSvgIconsPlugin());
  // vitePlugins.push(configStyleImportPlugin());

  // if (isBuild) {
  //   vitePlugins.push(configPwaConfig());
  // }

  return vitePlugins;
}
