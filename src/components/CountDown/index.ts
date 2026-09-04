import { withInstall } from "utils/index";
import countButton from "./src/CountButton.vue";
import countdownInput from "./src/CountdownInput.vue";

export const CountdownInput = withInstall(countdownInput);
export const CountButton = withInstall(countButton);
