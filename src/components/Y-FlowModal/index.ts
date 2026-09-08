import type { App, Plugin } from "vue";
import YFlowModal from "./index.vue";

YFlowModal.install = (app: App) => {
  app.component("YFlowModal", YFlowModal);
};

export default YFlowModal as typeof YFlowModal & Plugin;
