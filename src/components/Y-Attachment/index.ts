import type { App, Plugin } from "vue";
import Attachment from "./index.vue";

Attachment.install = (app: App) => {
  app.component("Attachment", Attachment);
};

export default Attachment as typeof Attachment & Plugin;
