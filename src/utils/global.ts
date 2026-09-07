// 模块级全局变量，可以在任何地方使用
export const globalConfig: any = {
  VITE_GLOB_APP_SHORT_NAME: "vue_vben_admin",
};

// 设置配置
export function setGlobalConfig(options: any) {
  // Object.assign(globalConfig, options);
  globalConfig.key = options?.key;
  globalConfig.project = `/${options?.key}/`;
  globalConfig.appId = `app_${options?.key}`;
  globalConfig.suffixApi = `/${options?.key}`;
  globalConfig.name = options?.name;
  globalConfig.VITE_GLOB_APP_SHORT_NAME =
    options?.VITE_GLOB_APP_SHORT_NAME ?? "vue_vben_admin";
}

// 获取配置
export function getGlobalConfig() {
  return globalConfig;
}
