import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
} from "vue-router";
import type { App, Component } from "vue";

import { intersectionWith, isEqual, mergeWith, unionWith } from "lodash-es";
import { unref } from "vue";
import { isArray, isObject } from "utils/is";

import dayjs from "dayjs";
export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4', c: ['1','2']}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4&c=1,2
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      parameters += `${key}=${encodeURIComponent(value.join(","))}&`;
    } else {
      parameters += `${key}=${encodeURIComponent(value)}&`;
    }
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, "?") + parameters;
}

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<
  T extends object | null | undefined,
  U extends object | null | undefined,
>(
  source: T,
  target: U,
  mergeArrays: "union" | "intersection" | "concat" | "replace" = "replace",
): T & U {
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case "union":
          return unionWith(sourceValue, targetValue, isEqual);
        case "intersection":
          return intersectionWith(sourceValue, targetValue, isEqual);
        case "concat":
          return sourceValue.concat(targetValue);
        case "replace":
          return targetValue;
        default:
          throw new Error(
            `Unknown merge array strategy: ${mergeArrays as string}`,
          );
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays);
    }
    return undefined;
  });
}

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
  },
) {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}

// dynamic use hook props
export function getDynamicProps<T extends Record<string, unknown>, U>(
  props: T,
): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).forEach((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(
  route: RouteLocationNormalized,
): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export type CustomComponent = Component & { displayName?: string };

export const withInstall = <T extends CustomComponent>(
  component: T,
  alias?: string,
) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as WithInstall<T>;
};

/**
 * @description 父子关系的数组转换成树形结构数据
 * @param data
 * @returns {*}
 */
export function translateDataToTree(data) {
  const parent = data.filter(
    (value) =>
      value.parentId === "undefined" ||
      value.parentId === null ||
      value.parentId === 0 ||
      value.parentId === -1 ||
      value.parentId === "-1" ||
      !value.parentId,
  );
  const children = data.filter(
    (value) =>
      value.parentId !== "undefined" &&
      value.parentId !== null &&
      value.parentId !== -1 &&
      value.parentId !== "" &&
      value.parentId,
  );
  const translator = (parent, children) => {
    parent.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children));
          temp.splice(index, 1);
          translator([current], temp);
          typeof parent.children !== "undefined" && parent.children !== null
            ? parent.children.push(current)
            : (parent.children = [current]);
        }
      });
    });
  };
  translator(parent, children);
  return parent;
}
export function listToTree(data, id) {
  // 1.定义最外层的数组
  const tree: any = [];
  // 2.定义一个空对象
  const otherObj = {};
  // 3.遍历数组内所有对象
  data.forEach((item) => {
    // 3.1.给每个当前对象添加一个 children 属性, 以便存放子级对象
    item.children = [];
    // 3.2 将当前对象的 id 作为键, 与当前对象自身形成键值对
    otherObj[item.id] = item;
  });

  // 4.再次遍历数组内所有对象
  data.forEach((item) => {
    // 4.1.判断每个当前对象的 pid, 如当前对象 pid 不为空, 则说明不是最上级的根对象
    if (item.parentId && item.parentId != id) {
      // 4.3.利用当前对象的 otherObj[pid] 找到 otherObj[id] 中对应当前对象的父级对象, 将当前对象添加到其对应的父级对象的 children 属性中
      otherObj[item.parentId].children.push(item);
    } else {
      // 4.3.当前对象 pid 如果为空, 则为树状结构的根对象
      tree.push(item);
    }
  });
  // 5.返回树状结构
  const result = handleTreeData(tree);
  return result;
}
//我在src/utils文件里新建了一个js文件
export function handleTreeData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children.length < 1) {
      data[i].children = undefined; // 看后端返的是child字段还是children字段，自行改变
    } else {
      handleTreeData(data[i].children); // children若不为空数组，则继续 递归调用 本方法
    }
  }
  return data;
}

const isEnv = import.meta.env["MODE"] === "development" ? true : false;
const origin = isEnv ? import.meta.env["VITE_ORIGIN"] : window.location.origin;
import { queryByIds } from "api/sys/fileUtils";

export async function getFileList(ids?: string) {
  const fileList: any = [];
  if (ids) {
    await queryByIds({
      id: Array.isArray(ids) ? ids?.join(",") : ids,
    })
      .then((res: any) => {
        const files: any = [];
        res?.map((r: any) => {
          if (r) {
            files.push(
              Object.assign(
                {},
                {
                  uid: r?.id,
                  response: {
                    result: [r || {}],
                  },
                  name: r?.fileName,
                  status: "done",
                  url: r?.path,
                  path: r?.path,
                  type: r?.contentType,
                },
                r?.contentType?.includes("svg")
                  ? {
                      svgSrc: `${origin}/ioe/api/file/imgFile/${r?.id}`,
                    }
                  : null,
              ),
            );
          }
        });
        fileList.push(...(files || []));
      })
      .catch((err: any) => {
        console.log("err", err);
      });
    return fileList;
  } else {
    return [];
  }
}
export async function getFileData(data: any, prop: string, newProp: string) {
  for (const d of data) {
    const newList: any = [];
    if (d[prop]) {
      const list: any = await getFileList(d[prop]);
      newList.push(...(list || []));
      d[newProp] = newList;
    }
  }
}

import { useWindowSize } from "@vueuse/core";
/* 
  x:鼠标x
  y:鼠标y
  w:容器宽
  h:容器高
*/
export const computedStylePosition = (
  { x, y, w, h, interval = 10 },
  position = "center",
) => {
  const { width, height } = useWindowSize();
  // 展示区域的宽高
  const contentW = width.value;
  const contentH = height.value - 89;
  // 相对于左上角的鼠标位置
  const zsX = x + interval;
  const zsY = y - 89;

  // 样式的top，left
  let styleLeft = 0;
  let styleTop = 0;
  if (position == "center") {
    if (h / 2 + zsY > contentH) {
      // 屏幕下方
      styleTop = zsY - h;
    } else if (h / 2 > zsY) {
      // 屏幕上方
      styleTop = zsY;
    } else {
      // 屏幕内部
      styleTop = zsY - h / 2;
    }

    if (zsX + w > contentW) {
      styleLeft = zsX - w - interval;
    } else {
      styleLeft = zsX;
    }
  } else if (position == "bottom") {
    if (zsY < h) {
      // 屏幕上方
      styleTop = zsY;
    } else {
      // 屏幕内部
      styleTop = zsY - h;
    }
    if (zsX + w > contentW) {
      // 屏幕右边
      styleLeft = zsX - w;
    } else {
      styleLeft = zsX;
    }
  }

  return {
    left: styleLeft + "px",
    top: styleTop + "px",
  };
};
export const getPathAssets = (url: string) => {
  return new URL(`/src/assets/images/map/${url}`, import.meta.url).href;
};

// 通过选中日期返回当前七天
export function getPreSevenDay(date: Date = new Date(), hasHour = false) {
  const endTime = hasHour
    ? dayjs(new Date(date)).format("YYYY-MM-DD HH:mm:ss")
    : dayjs(new Date(date)).format("YYYY-MM-DD");
  const startTime = hasHour
    ? dayjs(
        new Date(new Date(date).getTime() - 60 * 60 * 24 * 6 * 1000),
      ).format("YYYY-MM-DD HH:mm:ss")
    : dayjs(
        new Date(new Date(date).getTime() - 60 * 60 * 24 * 6 * 1000),
      ).format("YYYY-MM-DD");
  return { startTime, endTime };
}
// 获取时间的前24小时
export function getPre24Hours(date: Date = new Date()) {
  const endTime = dayjs(new Date(date)).format("YYYY-MM-DD HH:mm:ss");
  const startTime = dayjs(
    new Date(new Date(date).getTime() - 60 * 60 * 24 * 1000),
  ).format("YYYY-MM-DD HH:mm:ss");
  return { startTime, endTime };
}

import { getInfoById } from "api/sys/public";
export async function getTemplateSupportPc(id: any) {
  const res: any = await getInfoById({ id });
  return res?.supportPc;
}

export const setTableItemMaxFourStyle = (
  data?: any,
  maxCount = 4,
  columnGap = "8px",
) => {
  if (data?.length == 1) {
    return { maxWidth: "100%" };
  } else if (data?.length <= maxCount) {
    return {
      maxWidth: `calc((100% - ${columnGap} * ${data?.length - 1}) / ${
        data?.length
      })`,
    };
  } else {
    return {
      maxWidth: `calc((100% - ${columnGap} * ${maxCount - 1}) / ${maxCount})`,
    };
  }
};

export * from "./auth";
export * from "./cache";
export * from "./common";
export * from "./event";
export * from "./factory";
export * from "./file";
export * from "./helper";
export * from "./http";
export * from "./lib";
export * from "./park";
export * from "./bem";
export * from "./cacheUtil";
export * from "./cipher";
export * from "./color";
export * from "./copyTextToClipboard";
export * from "./dateUtil";
export * from "./dicUtil";
export * from "./domUtils";
export * from "./downLoad";
export * from "./env";
export * from "./fieldsUtil";
export * from "./getConfigFileName";
export * from "./getMapUrl";
export * from "./handleMapping";

export * from "./is";
export * from "./log";
export * from "./menusUtil";
// export * from "./mitt";
export * from "./myMitt";
export * from "./props";
export * from "./propTypes";
export * from "./time";
export * from "./types";
export * from "./uuid";
