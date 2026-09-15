import type { App, Plugin } from "vue";
import CustomDia from "./index.vue";

CustomDia.install = (app: App) => {
  app.component("CustomDia", CustomDia);
};

export default CustomDia as typeof CustomDia & Plugin;
