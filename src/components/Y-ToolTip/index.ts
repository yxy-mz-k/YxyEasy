import type { App, Plugin } from "vue";
import ToolTip from "./index.vue";

ToolTip.install = (app: App) => {
  app.component("ToolTip", ToolTip);
};

export default ToolTip as typeof ToolTip & Plugin;
