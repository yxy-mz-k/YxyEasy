import { withInstall } from "utils/withInstall";
import cropperImage from "./src/Cropper.vue";
import avatarCropper from "./src/CropperAvatar.vue";

export * from "./src/typing";
export const CropperImage = withInstall(cropperImage);
export const CropperAvatar = withInstall(avatarCropper);
