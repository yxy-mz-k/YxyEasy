import type { App, Plugin } from "vue";
import Clipboard from "./index.vue";

Clipboard.install = (app: App) => {
  app.component("Clipboard", Clipboard);
};

export default Clipboard as typeof Clipboard & Plugin;
