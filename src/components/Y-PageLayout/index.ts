import type { App, Plugin } from "vue";
import YPageLayout from "./index.vue";

YPageLayout.install = (app: App) => {
  app.component("YPageLayout", YPageLayout);
};

export default YPageLayout as typeof YPageLayout & Plugin;
