// export { createContextMenu, destroyContextMenu } from "./src/createContextMenu";
// 导出类型
export * from "./src/typing";

import type { App, Plugin } from "vue";
import contextMenu from "./src/ContextMenu.vue";
import { withInstall } from "utils/index";

// 导出函数式方法
import { createContextMenu, destroyContextMenu } from "./src/createContextMenu";

// 导出组件（用于全局注册）
export const ContextMenu = withInstall(contextMenu);

// 默认导出
export default {
  create: createContextMenu,
  destroy: destroyContextMenu,
  component: ContextMenu,
  install: (app: App) => {
    app.use(ContextMenu);
  },
};
export { createContextMenu, destroyContextMenu };
