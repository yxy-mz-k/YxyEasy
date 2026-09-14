import type { App, Plugin } from "vue";
import MapModal from "./index.vue";

MapModal.install = (app: App) => {
  app.component("MapModal", MapModal);
};

export default MapModal as typeof MapModal & Plugin;
