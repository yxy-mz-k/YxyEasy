import { withInstall } from "utils/index";
import basicTable from "./src/BasicTable.vue";
import tableAction from "./src/components/TableAction.vue";
import editTableHeaderIcon from "./src/components/EditTableHeaderIcon.vue";
import tableImg from "./src/components/TableImg.vue";

// 导出类型
export * from "./src/types/table";
export * from "./src/types/pagination";
export * from "./src/types/tableAction";
export type { FormSchema, FormProps } from "components/Form/src/types/form";
export type { EditRecordRow } from "./src/components/editable";

// 导出 hooks
export { useTable } from "./src/hooks/useTable";

// 使用 withInstall 包装组件
export const BasicTable = withInstall(basicTable);
export const TableAction = withInstall(tableAction);
export const EditTableHeaderIcon = withInstall(editTableHeaderIcon);
export const TableImg = withInstall(tableImg);

// 默认导出
export default {
  BasicTable,
  TableAction,
  EditTableHeaderIcon,
  TableImg,
};
