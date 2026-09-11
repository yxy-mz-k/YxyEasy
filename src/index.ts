// src/index.ts
import type { App } from "vue";
// import { nextTick } from "vue";
// import { createPinia, setActivePinia } from "pinia";
import type { YxyEasyOptions } from "./types";
import * as components from "./components";
import "styles/index.scss";
import "design/index.less";

// 导入配置
import { setGlobalConfig } from "utils/global";

import { setupStore } from "store/index";
import { setupI18n } from "locales/setupI18n";
import { router, setupRouter } from "router/index";
import { setupRouterGuard } from "router/guard/index";
import { initAppConfigStore } from "logics/initAppConfig";
// import { registerGlobComp } from "components/registerGlobComp";
import { useUserStoreWithOut } from "store/modules/user";
import { useAppStore } from "store/modules/app";
import { MenuModeEnum, MenuTypeEnum } from "enums/menuEnum";

// 导出所有内容
export * from "./api";
export * from "./components";
// export * from "./design/index.less";
export * from "./enums";
export * from "./hooks";
export * from "./settings";
export * from "./locales";
export * from "./store";
export * from "./utils";
export type * from "./types";
// export { defHttp } from "./utils/http";

// 默认导出插件
const install = (app: App, options?: YxyEasyOptions) => {
  // 1. 先设置全局配置（在任何 store 使用之前）
  if (options) {
    setGlobalConfig(options);
  }

  import("utils/http").then(({ refreshDefHttp }) => {
    refreshDefHttp();
  });
  // 等待下一帧，确保配置生效
  // await nextTick(() => {});

  // 2. 初始化 Pinia
  // const pinia = createPinia();
  // setActivePinia(pinia);
  // app.use(pinia);

  setupStore(app);
  initAppConfigStore();
  // registerGlobComp(app);
  setupI18n(app);

  // 6. 注册组件
  Object.values(components).forEach((component: any) => {
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });

  setupRouter(app);
  setupRouterGuard(router);

  const userStore = useUserStoreWithOut();
  const appStore = useAppStore();
  const regex = /user_token=([^#/&]+)/;
  const matchResult = window.location.href.match(regex);
  let user_token = matchResult ? matchResult[1] : null;
  if (!user_token) {
    const regexT = /token=([^#/&]+)/;
    const matchResultT = window.location.href.match(regexT);
    user_token = matchResultT ? matchResultT[1] : null;
  }
  if (user_token) {
    sessionStorage.setItem("user_token", user_token);
  }

  const temp = sessionStorage.getItem("user_token");
  if (temp) {
    userStore.setToken(temp);
  }

  //跳转
  if (user_token) {
    let href = window.location.href.replace(/user_token=[^#/&]+/, "");
    href = href.replace("/?#/", "/");
    if (href.endsWith("&")) {
      href = href.substring(0, href.lastIndexOf("&"));
    }
    if (href.endsWith("?")) {
      href = href.substring(0, href.lastIndexOf("?"));
    }
    window.location.replace(href);
    href = href.replace(/http[s]?:\/\/[^/]+\/[^/]*/, "");
    if (href === "") {
      href = "/";
    }
    if (href.indexOf("?") > -1) {
      const urlSearchParams = new URLSearchParams(href.split("?")[1]);
      const params = Object.fromEntries(urlSearchParams.entries());
      const queryObj: any = {};
      Object.keys(params).map((k: any) => {
        if (k !== "user_token") {
          queryObj[k] = params[k];
        }
      });
      if (Object.keys(params).length > 1) {
        router.push({
          path: href.replace("#/", ""),
          query: queryObj,
        });
      } else {
        router.push(href.replace("#/", ""));
      }
    } else {
      router.push(href.replace("#/", ""));
    }
  }

  if (!(window.self === window.top)) {
    appStore.setProjectConfig({
      fullContent: true,
      showFooter: false,
      showSettingButton: false,
    });
  } else {
    appStore.setProjectConfig({
      fullContent: false,
      showFooter: true,
      showSettingButton: true,
    });
  }
  appStore.setProjectConfig({
    menuSetting: {
      type: MenuTypeEnum.MIX,
      mode: MenuModeEnum.INLINE,
      split: false,
    },
  });
};

export default {
  install,
};
