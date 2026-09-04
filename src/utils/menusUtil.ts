import { getMenuListResultModel } from "api/sys/model/menuModel";
import { translateDataToTree } from "utils/index";
export const getFormatMenusByData = (dataList: any) => {
  // eslint-disable-next-line prefer-const
  const isDev = import.meta.env["DEV"];
  const origin = isDev
    ? import.meta.env["VITE_ORIGIN"]
    : window.location.origin;
  dataList.forEach((element) => {
    //将拓展字段加入字段表
    if (element.exts) {
      const newArr = {};
      element.exts.map((itm) => {
        newArr[itm.extKey] = itm.extValue;
      });
      element = Object.assign(element, newArr);
    }
  });
  const btnList = dataList.filter((d: any) => d.menu_type === "3");
  const btnCodeList = btnList.map((b: any) => b.code);

  dataList = dataList.filter((d: any) => d.menu_type !== "3");
  dataList = dataList.map((item) => {
    let component = item.component || "LAYOUT";
    const component_name = item.component_name || "";
    let frameSrc = "";
    const path = item.path;
    //外链打开方式-self
    // if (item.is_out === '1' && item.out_open_method === '3') {
    //   component = 'IFrame';
    // } else if (item.is_out === '1' && item.out_open_method === '1') {
    //   //iframe方式
    //   // frameSrc = item.path;
    //   path = path;
    //   component = 'IFrame';
    //   frameSrc = item.component;
    // }
    if (item.is_out === "0" && item.out_open_method === "1") {
      // 非外链 iframe
      //iframe方式
      component = "IFrame";
      // frameSrc = item.path;
      // frameSrc = `${origin}${item.component_name}?user_token=${userStore.getToken}`;
      frameSrc = `${origin}${item.component_name}`;
      // path = path;
      // component = 'IFrame';
      // frameSrc = item.component;
      // component = item.component;
      // component_name = item.component_name;
    }

    return {
      frameSrc: frameSrc,
      component_name,
      path: path,
      name: item.component_name,
      component: component,
      parentId: item.parentId,
      id: item.id,
      meta: {
        title: item.name,
        icon: item.icon,
        orderNo: Number(item.sort),
        hideMenu: item.hidden == 0 ? false : true,
        frameSrc: frameSrc,
      },
    };
  });

  // dataList.push({
  //   path: 'https://192.168.2.139:3101/emain/',
  //   name: '测试',
  //   component: 'IFrame',
  //   meta: {
  //     title: '测试',
  //   },
  // });

  dataList = dataList.sort((a, b) => a.meta.orderNo - b.meta.orderNo);
  const dataListInfo = translateDataToTree(dataList);
  let returnValue: getMenuListResultModel = [];
  returnValue = dataListInfo as getMenuListResultModel;
  return {
    returnValue,
    btnCodeList,
  };
};
