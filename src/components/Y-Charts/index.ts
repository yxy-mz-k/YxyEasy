import type { App, Plugin } from "vue";
import YCharts from "./index.vue";

YCharts.install = (app: App) => {
  app.component("YCharts", YCharts);
};

export default YCharts as typeof YCharts & Plugin;
