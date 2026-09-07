import { withInstall } from "utils/withInstall";
import basicUpload from "./src/BasicUpload.vue";
import uploadImage from "./src/components/ImageUpload.vue";

export const ImageUpload = withInstall(uploadImage);
export const BasicUpload = withInstall(basicUpload);
