/**
 * Zero-config PWA for Vite
 * https://github.com/antfu/vite-plugin-pwa
 */
import { VitePWA } from "vite-plugin-pwa";
import { useConfigStore } from "store/modules/config";

export function configPwaConfig(env: ViteEnv) {
  const EASYCONFIG = useConfigStore();
  const { VITE_USE_PWA, VITE_GLOB_APP_TITLE } = env;

  if (VITE_USE_PWA) {
    // vite-plugin-pwa
    const pwaPlugin = VitePWA({
      manifest: {
        name: EASYCONFIG?.name,
        short_name: EASYCONFIG?.VITE_GLOB_APP_SHORT_NAME,
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
