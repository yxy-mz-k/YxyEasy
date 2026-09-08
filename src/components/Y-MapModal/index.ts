import type { App, Plugin } from "vue";
import YMapModal from "./index.vue";

YMapModal.install = (app: App) => {
  app.component("YMapModal", YMapModal);
};

export default YMapModal as typeof YMapModal & Plugin;
