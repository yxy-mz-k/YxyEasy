import type { AppRouteModule } from "router/types";
import { LAYOUT } from "router/constant";

const dashboard: AppRouteModule = {
  path: "/home",
  name: "Home",
  component: LAYOUT,
  redirect: "/home/index",
  meta: {
    orderNo: 10,
    icon: "ion:grid-outline",
    title: "首页",
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: "index",
      name: "Index",
      component: () => import("views/index/index.vue"),
      meta: {
        // affix: true,
        title: "首页",
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
