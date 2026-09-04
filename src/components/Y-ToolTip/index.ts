import type { App, Plugin } from "vue";
import YToolTip from "./index.vue";

YToolTip.install = (app: App) => {
  app.component("YToolTip", YToolTip);
};

export default YToolTip as typeof YToolTip & Plugin;
