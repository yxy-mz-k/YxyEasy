import type { App, Plugin } from "vue";
import Charts from "./index.vue";

Charts.install = (app: App) => {
  app.component("Charts", Charts);
};

export default Charts as typeof Charts & Plugin;
