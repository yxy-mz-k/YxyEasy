import type { App, Plugin } from "vue";
import HandleFixed from "./index.vue";

HandleFixed.install = (app: App) => {
  app.component("HandleFixed", HandleFixed);
};

export default HandleFixed as typeof HandleFixed & Plugin;
