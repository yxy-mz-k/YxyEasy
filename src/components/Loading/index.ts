import { withInstall } from "utils/index";
import loading from "./src/Loading.vue";

export const Loading = withInstall(loading);

export { useLoading } from "./src/useLoading";
export { createLoading } from "./src/createLoading";
