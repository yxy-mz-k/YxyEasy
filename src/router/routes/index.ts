import type { AppRouteRecordRaw, AppRouteModule } from "router/types";

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "router/routes/basic";

import { PageEnum } from "enums/pageEnum";

const modules = import.meta.glob("./modules/**/*.ts", { eager: true });

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("views/sys/login/Login.vue"),
  meta: {
    title: "routes.basic.login",
  },
};

let basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];

export const setBR = (config?: any): any => {
  basicRoutes.push(...(config?.basicRoutes ?? [])); // ← push 而不是重新赋值
};
// Basic routing without permission
export { basicRoutes };
