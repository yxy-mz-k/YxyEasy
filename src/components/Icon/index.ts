import { withInstall } from "utils/index";
import icon from "./src/Icon.vue";
import svgIcon from "./src/SvgIcon.vue";
import iconPicker from "./src/IconPicker.vue";

export const Icon = withInstall(icon);
export const SvgIcon = withInstall(svgIcon);
export const IconPicker = withInstall(iconPicker);

export default Icon;
