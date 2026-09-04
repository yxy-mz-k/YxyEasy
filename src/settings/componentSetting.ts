// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from "../components/Table";

export default {
  // basic-table setting
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    fetchSetting: {
      // The field name of the current page passed to the background
      pageField: "pageNo",
      // The number field name of each page displayed in the background
      sizeField: "pageSize",
      // Field name of the form data returned by the interface
      listField: "records",
      // Total number of tables returned by the interface field name
      totalField: "total",
    },
    // Number of pages that can be selected
    pageSizeOptions: ["15", "25", "35", "50", "100"],
    // Default display quantity on one page
    defaultPageSize: 15,
    // Default Size
    defaultSize: "middle",
    // Custom general sort function
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      if (field && order) {
        return {
          // The sort field passed to the backend you
          field,
          // Sorting method passed to the background asc/desc
          order,
        };
      } else {
        return {};
      }
    },
    // Custom general filter function
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
    tableSetting: {
      // 是否显示刷新按钮
      redo: false,
      // 是否显示尺寸调整按钮
      size: false,
      // 是否显示字段调整按钮
      setting: true,
      // 是否显示全屏按钮
      fullScreen: false,
    },
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false,
  },
  //表单配置
  form: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
    //表单默认冒号
    colon: true,
  },
};

/**
 * 获取排序信息
 * @param item
 */
function getSort(item) {
  const { field, order } = item;
  if (field && order) {
    const sortType = "ascend" == order ? "asc" : "desc";
    return {
      // 排序字段
      column: field,
      // 排序方式 asc/desc
      order: sortType,
    };
  }
  return "";
}
