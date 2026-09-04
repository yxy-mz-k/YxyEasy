import type { App } from "vue";
import { createPinia } from "pinia";
// import { setConfig, getConfig } from "./config";
import type { YxyEasyOptions } from "./types";
import * as components from "./components";
import "./styles/index.scss";

// 只导出核心功能，避免命名污染
// export { setConfig, getConfig } from "./config";

// 导出组件
export * from "./api";
export * from "./components";
export * from "./enums";
export * from "./hooks";
export * from "./settings";
export * from "./store";
export * from "./utils";
export type * from "./types";
// 导出 defHttp（方便用户使用）
export { defHttp } from "./utils/http";
// 导出配置 store
import { useConfigStore } from "store/modules/config";

// 默认导出插件
const install = (app: App, options?: YxyEasyOptions) => {
  // 设置配置
  // options && setConfig(options);

  // 初始化 Pinia
  const pinia = createPinia();
  app.use(pinia);

  // 2. 初始化配置 store
  const EASYCONFIG = useConfigStore();
  EASYCONFIG.setConfig(options);

  // 注册组件
  Object.values(components).forEach((component: any) => {
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });

  // 注入全局配置
  // app.provide("YXY_EASY_CONFIG", options);
  // app.config.globalProperties.$yxyEasy = options;
};

export default {
  install,
  // version: '0.0.2',
};
