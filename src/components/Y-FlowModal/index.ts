import type { App, Plugin } from "vue";
import FlowModal from "./index.vue";

FlowModal.install = (app: App) => {
  app.component("FlowModal", FlowModal);
};

export default FlowModal as typeof FlowModal & Plugin;
