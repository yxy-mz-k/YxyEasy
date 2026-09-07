// src/index.ts
import type { App } from "vue";
import { createPinia } from "pinia";
import type { YxyEasyOptions } from "./types";
import * as components from "./components";
import "./styles/index.scss";

// 导入配置
import { setGlobalConfig } from "utils/env";
import { useConfigStore } from "store/modules/config";

// 导出所有内容
export * from "./api";
export * from "./components";
export * from "./enums";
export * from "./hooks";
export * from "./settings";
export * from "./store";
export * from "./utils";
export type * from "./types";
export { defHttp } from "./utils/http";

// 默认导出插件
const install = (app: App, options?: YxyEasyOptions) => {
  // 1. 先设置全局配置（在任何 store 使用之前）
  if (options) {
    setGlobalConfig(options);
  }

  // 2. 初始化 Pinia
  const pinia = createPinia();
  app.use(pinia);

  // 3. 保存 pinia 到全局（供后续使用）
  (window as any).__PINIA__ = pinia;

  // 4. 初始化配置 store
  const EASYCONFIG = useConfigStore();
  EASYCONFIG.setConfig(options);

  // 5. 设置全局配置（从 store 获取完整配置）
  setGlobalConfig(EASYCONFIG.getConfig());

  // 6. 注册组件
  Object.values(components).forEach((component: any) => {
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });

  // 7. 注入全局配置
  app.provide("YXY_EASY_CONFIG", options);
  app.config.globalProperties.$yxyEasy = options;
};

export default {
  install,
};
