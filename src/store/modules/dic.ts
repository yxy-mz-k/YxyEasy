import { defineStore } from "pinia";
import { store } from "store/index";

import { remove } from "lodash-es";

interface DictState {
  DictList?: any;
}

export const useDictStore = defineStore({
  id: "app-dict",
  state: (): DictState => ({
    DictList: [],
  }),
  getters: {
    getDicList(): any {
      return this.DictList;
    },
  },
  actions: {
    setDicList(dictCode: any, res) {
      this.DictList.push({
        dictCode: dictCode,
        dictList: res,
      });
    },
    deleteDicList(dictCode: any) {
      remove(this.DictList, function (n: any) {
        return n.dictCode == dictCode;
      });
    },
  },
});

// Need to be used outside the setup
export function useDictStoreWithOut() {
  return useDictStore(store);
}
