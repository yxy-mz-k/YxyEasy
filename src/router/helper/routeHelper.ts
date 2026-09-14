import type { AppRouteModule, AppRouteRecordRaw } from "router/types";
import type { Router, RouteRecordNormalized } from "vue-router";

import { getParentLayout, LAYOUT, EXCEPTION_COMPONENT } from "router/constant";
import { cloneDeep, omit } from "lodash-es";
import { warn } from "utils/log";
import { createRouter, createWebHashHistory } from "vue-router";
import { getGlobalConfig } from "utils/global";

export type LayoutMapKey = "LAYOUT";
const IFRAME = () => import("views/sys/iframe/FrameBlank.vue");

const LayoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();

LayoutMap.set("LAYOUT", LAYOUT);
LayoutMap.set("IFRAME", IFRAME);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

/**
 * 获取所有可用的 views（依赖库 + 业务项目）
 */
function getAllViewModules(): Record<string, () => Promise<Recordable>> {
  const globalConfig = getGlobalConfig();
  // 依赖库自己的 views
  dynamicViewsModules =
    dynamicViewsModules || import.meta.glob("../../views/**/*.{vue,tsx}");

  // 合并业务项目的 views（覆盖依赖库同名的）
  return {
    ...dynamicViewsModules,
    ...globalConfig?.views,
  };
}

// Dynamic introduction
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  const allModules = getAllViewModules();
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = "IFRAME";
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get((component as string).toUpperCase());
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        item.component = dynamicImport(allModules, component as string);
      }
    } else if (name) {
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules);

  const normalizedComponent = (component as string)
    .replace(/^\//, "")
    .replace(/\.vue$/, "")
    .replace(/\.tsx$/, "");

  const matchKeys = keys.filter((key) => {
    let k = key
      .replace(/^\.\.\/\.\.\/views\//, "")
      .replace(/^\.\/views\//, "")
      .replace(/^\.\.\/views\//, "");

    k = k.replace(/\.vue$/, "").replace(/\.tsx$/, "");

    return k === normalizedComponent;
  });

  if (matchKeys.length === 0) {
    // warn("在 src/views/ 下找不到 `" + component + ".vue`, 请自行创建!");
    return EXCEPTION_COMPONENT;
  }

  // 优先业务项目的
  const externalKey = matchKeys.find((k) => k.startsWith("./views/"));
  const selectedKey = externalKey || matchKeys[0];

  return dynamicViewsModules[selectedKey];
}

// Turn background objects into routing objects
export function transformObjToRoute<T = AppRouteModule>(
  routeList: AppRouteModule[],
): T[] {
  routeList.forEach((route) => {
    const component = route.component as string;
    if (component) {
      if (component.toUpperCase() === "LAYOUT") {
        route.component = LayoutMap.get(component.toUpperCase());
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${route.name}Parent`;
        route.path = "";
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    } else {
      // warn("请正确配置路由：" + route?.name + "的component属性");
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}

/**
 * Convert multi-level routing to level 2 routing
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

// Routing level upgrade
function promoteRouteLevel(routeModule: AppRouteModule) {
  // Use vue-router to splice menus
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.map((item) =>
    omit(item, "children"),
  );
}

// Add all sub-routes to the secondary route
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule,
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

// Determine whether the level exceeds 2 levels
function isMultipleRoute(routeModule: AppRouteModule) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, "children") ||
    !routeModule.children?.length
  ) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
