import type { App, Plugin } from "vue";
import Splitpanes from "./index.vue";

Splitpanes.install = (app: App) => {
  app.component("Splitpanes", Splitpanes);
};

export default Splitpanes as typeof Splitpanes & Plugin;
