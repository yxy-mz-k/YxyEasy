import { reactive, readonly } from "vue";
// 模块级全局变量，可以在任何地方使用
export let globalConfig: any = reactive<any>({
  isEnv: false,
  VITE_ORIGIN: "http://192.168.6.2:8899",
  VITE_HOST: "192.168.6.2:8899",
  VITE_PUBLIC_PATH: "/park",
  VITE_GLOB_APP_SHORT_NAME: "vue_vben_admin",
  GLOB_CONFIG_FILE_NAME: "_app.config.js",
  VITE_USE_PWA: false,
  VITE_PROXY: [
    ["/upload", "http://192.168.6.2:8899/upload"],
    ["/oss", "http://192.168.6.2:8899/oss"],
  ],
});

// 设置配置
export function setGlobalConfig(options: any) {
  // Object.assign(globalConfig, options);
  globalConfig = Object.assign({}, globalConfig, options, {
    project: `/${options?.key}/`,
    appId: `app_${options?.key}`,
    suffixApi: `/${options?.key}`,
  });
}

// 获取配置
export function getGlobalConfig() {
  return readonly(globalConfig);
}
