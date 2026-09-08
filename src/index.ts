// src/index.ts
import type { App } from "vue";
import { createPinia, setActivePinia } from "pinia";
import type { YxyEasyOptions } from "./types";
import * as components from "./components";
import "./styles/index.scss";
// import "design/theme.less";
import "design/index.less";

// 导入配置
import { setGlobalConfig } from "utils/global";
// import { useConfigStore } from "store/modules/config";

import { setupStore } from "store/index";
import { setupI18n } from "locales/setupI18n";
import { router, setupRouter } from "router/index";
import { setupRouterGuard } from "router/guard/index";

// 导出所有内容
export * from "./api";
export * from "./components";
// export * from "./design/index.less";
export * from "./enums";
export * from "./hooks";
export * from "./settings";
export * from "./store";
export * from "./utils";
export type * from "./types";
export { defHttp } from "./utils/http";

// 默认导出插件
const install = async (app: App, options?: YxyEasyOptions) => {
  // 1. 先设置全局配置（在任何 store 使用之前）
  if (options) {
    setGlobalConfig(options);
  }
  // 2. 初始化 Pinia
  // const pinia = createPinia();
  // setActivePinia(pinia);
  // app.use(pinia);

  setupStore(app);
  await setupI18n(app);
  setupRouter(app);
  setupRouterGuard(router);

  // 6. 注册组件
  Object.values(components).forEach((component: any) => {
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });
};

export default {
  install,
};
