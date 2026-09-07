// export { default as ImagePreview } from "./src/Preview.vue";
export { createImgPreview } from "./src/functional";

import { withInstall } from "utils/index";
import imagePreview from "./src/Preview.vue";
export const ImagePreview = withInstall(imagePreview);

export default {
  ImagePreview,
};
