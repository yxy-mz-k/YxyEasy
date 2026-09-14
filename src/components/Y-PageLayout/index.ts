import type { App, Plugin } from "vue";
import PageLayout from "./index.vue";

PageLayout.install = (app: App) => {
  app.component("PageLayout", PageLayout);
};

export default PageLayout as typeof PageLayout & Plugin;
