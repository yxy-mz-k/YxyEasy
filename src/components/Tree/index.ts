import { withInstall } from "utils/index";
import basicTree from "./src/BasicTree.vue";
import "./style";

// export { BasicTree };

export const BasicTree = withInstall(basicTree);
export type { ContextMenuItem } from "hooks/web/useContextMenu";
export * from "./src/types/tree";
