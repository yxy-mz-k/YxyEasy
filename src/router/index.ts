import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from "./routes";
import { globalConfig } from "utils/global";
// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

// app router
export const router = createRouter({
  history: createWebHashHistory(globalConfig.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// 标记是否已安装
let installed = false;
// config router
export function setupRouter(app: App<Element>) {
  // 防止重复安装
  if (installed) {
    return;
  }
  if (!app.config.globalProperties.$router) {
    app.use(router);
    installed = true;
  }
}
