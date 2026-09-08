/**
 * Zero-config PWA for Vite
 * https://github.com/antfu/vite-plugin-pwa
 */
import { VitePWA } from "vite-plugin-pwa";
import { globalConfig } from "utils/global";

export function configPwaConfig() {
  if (globalConfig?.VITE_USE_PWA) {
    // vite-plugin-pwa
    const pwaPlugin = VitePWA({
      manifest: {
        name: globalConfig?.name,
        short_name: globalConfig?.VITE_GLOB_APP_SHORT_NAME,
        icons: [
          {
            src: "./resource/img/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./resource/img/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    });
    return pwaPlugin;
  }
  return [];
}
