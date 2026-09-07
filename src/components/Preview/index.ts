// export { default as ImagePreview } from "./src/Preview.vue";
export { createImgPreview } from "./src/functional";

import { withInstall } from "utils/withInstall";
import imagePreview from "./src/Preview.vue";
export const ImagePreview = withInstall(imagePreview);

export default {
  ImagePreview,
};
