/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "../../../package.json";
import { getGlobalConfig } from "../global";

export function configHtmlPlugin() {
  let globalConfig = getGlobalConfig();
  // const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;
  const isBuild = !globalConfig?.isEnv;
  const getAppConfigSrc = () => {
    // return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
    return `${globalConfig?.GLOB_CONFIG_FILE_NAME}?v=${
      pkg.version
    }-${new Date().getTime()}`;
  };

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: globalConfig?.name,
      },
      // Embed the generated app.config.js file
      tags: isBuild
        ? [
            {
              tag: "script",
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });
  return htmlPlugin;
}
