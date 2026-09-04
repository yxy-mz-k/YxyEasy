import { defineStore } from "pinia";
import { store } from "store/index";

interface FieldsState {
  FieldsDicList?: any;
}

export const useFieldsStore = defineStore({
  id: "app-fields",
  state: (): FieldsState => ({
    FieldsDicList: [],
  }),
  getters: {
    getFieldsList(): any {
      return this.FieldsDicList;
    },
  },
  actions: {
    setFieldsList(list: any) {
      this.FieldsDicList = list;
    },
  },
});

// Need to be used outside the setup
export function useFieldsStoreWithOut() {
  return useFieldsStore(store);
}
