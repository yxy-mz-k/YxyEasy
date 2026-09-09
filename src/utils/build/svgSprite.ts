/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { getGlobalConfig } from "../global";

export function configSvgIconsPlugin() {
  let globalConfig = getGlobalConfig();
  const isBuild = !globalConfig?.isEnv;
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild,
    // default
    symbolId: "icon-[dir]-[name]",
  });
  return svgIconsPlugin;
}
