import { defHttp } from "utils/http/index";

export const getFactoDictList = async (url) => {
  const data = await getDictMultiApi(url);
  if (data) {
    return (await data).map((item) => {
      return {
        label: item.name,
        value: item.code,
      };
    });
  }
};

export const getDictMultiApi = (url: string) => {
  return defHttp.get<any>({
    url: "/homs/api/" + url,
  });
};
