import { withInstall } from "utils/withInstall";
import loading from "./src/Loading.vue";

export const Loading = withInstall(loading);

export { useLoading } from "./src/useLoading";
export { createLoading } from "./src/createLoading";
