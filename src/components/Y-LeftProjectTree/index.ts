import type { App, Plugin } from "vue";
import YLeftProjectTree from "./index.vue";

YLeftProjectTree.install = (app: App) => {
  app.component("YLeftProjectTree", YLeftProjectTree);
};

export default YLeftProjectTree as typeof YLeftProjectTree & Plugin;
