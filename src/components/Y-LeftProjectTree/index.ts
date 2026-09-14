import type { App, Plugin } from "vue";
import LeftProjectTree from "./index.vue";

LeftProjectTree.install = (app: App) => {
  app.component("LeftProjectTree", LeftProjectTree);
};

export default LeftProjectTree as typeof LeftProjectTree & Plugin;
