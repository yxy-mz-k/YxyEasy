import type { App, Plugin } from "vue";
import SignWordModal from "./index.vue";

SignWordModal.install = (app: App) => {
  app.component("SignWordModal", SignWordModal);
};

export default SignWordModal as typeof SignWordModal & Plugin;
