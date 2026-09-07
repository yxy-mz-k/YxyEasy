import { withInstall } from "utils/withInstall";

export * from "./src/types/form";
export * from "./src/types/formItem";

export { useComponentRegister } from "./src/hooks/useComponentRegister";
export { useForm } from "./src/hooks/useForm";

import basicForm from "./src/BasicForm.vue";
import apiSelect from "./src/components/ApiSelect.vue";
import apiMulSelect from "./src/components/ApiMulSelect.vue";
import radioButtonGroup from "./src/components/RadioButtonGroup.vue";
import apiTreeSelect from "./src/components/ApiTreeSelect.vue";
import apiTree from "./src/components/ApiTree.vue";
import apiRadioGroup from "./src/components/ApiRadioGroup.vue";
import apiCascader from "./src/components/ApiCascader.vue";
import apiTransfer from "./src/components/ApiTransfer.vue";

export const BasicForm = withInstall(basicForm);
export const ApiSelect = withInstall(apiSelect);
export const ApiMulSelect = withInstall(apiMulSelect);
export const RadioButtonGroup = withInstall(radioButtonGroup);
export const ApiTreeSelect = withInstall(apiTreeSelect);
export const ApiTree = withInstall(apiTree);
export const ApiRadioGroup = withInstall(apiRadioGroup);
export const ApiCascader = withInstall(apiCascader);
export const ApiTransfer = withInstall(apiTransfer);

// 默认导出
export default {
  ApiSelect,
  ApiMulSelect,
  RadioButtonGroup,
  ApiTreeSelect,
  ApiTree,
  ApiRadioGroup,
  ApiCascader,
  ApiTransfer,
};
