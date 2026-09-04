import type { App, Plugin } from "vue";
import YSplitpanes from "./index.vue";

YSplitpanes.install = (app: App) => {
  app.component("YSplitpanes", YSplitpanes);
};

export default YSplitpanes as typeof YSplitpanes & Plugin;
