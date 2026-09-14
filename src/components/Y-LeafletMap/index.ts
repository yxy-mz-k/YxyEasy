import type { App, Plugin } from "vue";
import LeafletMap from "./index.vue";

LeafletMap.install = (app: App) => {
  app.component("LeafletMap", LeafletMap);
};

export default LeafletMap as typeof LeafletMap & Plugin;
