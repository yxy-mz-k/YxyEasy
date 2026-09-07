import { withInstall } from "utils/index";
import simpleMenu from "./src/SimpleMenu.vue";
import simpleMenuTag from "./src/SimpleMenuTag.vue";

export const SimpleMenu = withInstall(simpleMenu);
export const SimpleMenuTag = withInstall(simpleMenuTag);

export default {
  SimpleMenu,
  SimpleMenuTag,
};
