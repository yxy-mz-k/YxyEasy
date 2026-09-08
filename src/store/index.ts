import type { App } from "vue";
import { createPinia, setActivePinia } from "pinia";

const store = createPinia();
// setActivePinia(store);
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };

export * from "./modules";
export * from "./mapSiteInfo";
export * from "./theme";
