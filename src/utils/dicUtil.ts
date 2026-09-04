import { defHttp } from "utils/http/index";
import { useDictStore } from "store/modules/dic";
import { useConfigStore } from "store/modules/config";

enum Api {
  getDic = "/api/sys/dictTree",
}
const dictStore = useDictStore();
export const getOptionsByDictCode = async (dictCode) => {
  let result: any = null;
  result = dictStore.getDicList.filter(
    (ditem) => ditem.dictCode.toString() == dictCode,
  )[0];
  if (!result) {
    const data = await getDicListByDictCode(dictCode);
    dictStore.setDicList(dictCode, data);
    result = data;
  } else {
    result = dictStore.getDicList.filter(
      (ditem) => ditem.dictCode.toString() == dictCode,
    )[0].dictList;
  }
  if (result) {
    return (await result).map((item) => {
      return {
        label: item.dictName,
        value: item.dictCode.toString(),
      };
    });
  }
};
export const updateOptionsByDictCode = async (dictCode) => {
  let result: any = null;
  result = dictStore.getDicList.filter(
    (ditem) => ditem.dictCode.toString() == dictCode,
  )[0];
  if (!result) {
    const data = await getDicListByDictCode(dictCode);
    dictStore.setDicList(dictCode, data);
  } else {
    dictStore.deleteDicList(dictCode);
    setTimeout(async () => {
      const data = await getDicListByDictCode(dictCode);
      dictStore.setDicList(dictCode, data);
    }, 500);
  }
};

export const getDicListByDictCode = (dictCode) => {
  const EASYCONFIG = useConfigStore();
  return defHttp.post<any>({
    url: `${EASYCONFIG?.suffixApi}${Api.getDic}`,
    params: { dictCode: dictCode },
  });
};
//从接口中读取dicname
export const getDictNameByDicCode = async (dictCode, dictValue) => {
  const EASYCONFIG = useConfigStore();
  const result = defHttp.post<any[]>({
    url: `${EASYCONFIG?.suffixApi}${Api.getDic}`,
    params: { dictCode: dictCode },
  });
  if (result) {
    const dicList = (await result).filter(
      (ditem) => ditem.dictCode.toString() == dictValue.toString(),
    );
    if (dicList.length > 0) {
      return dicList[0].dictName;
    } else {
      return "";
    }
  } else {
    return "";
  }
};
//从缓存中读取dicname----获取反向字典值
export const getDictName = (dictCode, dictValue) => {
  const storeInfo = dictStore.getDicList.filter(
    (ditem) => ditem.dictCode.toString() == dictCode,
  );

  if (storeInfo.length > 0) {
    const result = dictStore.getDicList.filter(
      (ditem) => ditem.dictCode.toString() == dictCode,
    )[0].dictList;
    const dicReslut =
      dictValue != null && dictValue != undefined
        ? result.filter(
            (item) => item.dictCode.toString() == dictValue.toString(),
          )
        : [];
    if (dicReslut.length > 0) {
      return dicReslut[0].dictName;
    } else {
      return "";
    }
  } else {
    return "";
  }
};

/**
 * 回显数据字典（字符串数组）
 * @param {*} datas
 * @param {*} value
 * @param {*} separator
 * @returns
 */
//datas, value
export function formatDictLabel(dictCode, value, separator) {
  const dictStore = useDictStore();
  const datas = dictStore.getDicList.filter(
    (ditem) => ditem.dictCode.toString() == dictCode,
  )[0].dictList;
  const actions = [];
  const currentSeparator = undefined === separator ? "," : separator;
  const temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].dictCode == "" + temp[val]) {
        // @ts-ignore
        actions.push(datas[key].dictName + currentSeparator);
      }
    });
  });
  return actions.join("").substring(0, actions.join("").length - 1);
}
