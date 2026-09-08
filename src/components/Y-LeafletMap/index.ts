import type { App, Plugin } from "vue";
import YLeafletMap from "./index.vue";

YLeafletMap.install = (app: App) => {
  app.component("YLeafletMap", YLeafletMap);
};

export default YLeafletMap as typeof YLeafletMap & Plugin;
