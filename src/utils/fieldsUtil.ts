import { useFieldsStore } from "store/modules/fields";
import { getOptionsByDictCode } from "utils/dicUtil";

export function getTypeByDictName(value: string): string {
  const fieldStore = useFieldsStore();
  return fieldStore.getFieldsList.filter((item) => item.dictCode == value)[0]
    .dictName;
}

export const getFiledsExtsList = async (originList: any, fieldList: any) => {
  fieldList = fieldList.sort((a, b) => Number(a.sort) - Number(b.sort));
  for (let i = 0; i < fieldList.length; i++) {
    const ftype = getTypeByDictName(fieldList[i].fieldType);
    switch (ftype) {
      case "字符串":
        if (fieldList[i].dictCode) {
          const sOptions = await getOptionsByDictCode(fieldList[i].dictCode);
          if (fieldList[i].dictMulti == "1") {
            //多选
            originList.value.push({
              field: fieldList[i].fieldKey,
              component: "CheckboxGroup",
              label: fieldList[i].fieldName,
              defaultValue: fieldList[i].defaultValue,
              colProps: {
                span: 24,
              },
              rules: [
                {
                  required: fieldList[i].neetMust == 1,
                  validator: async (rule, value) => {
                    if (!value && fieldList[i].neetMust == 1) {
                      return Promise.reject("值不能为空");
                    }
                    if (value && fieldList[i].regex) {
                      const reg = new RegExp(fieldList[i].regex);
                      if (reg.test(value)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(fieldList[i].regexFailMsg);
                      }
                    }
                  },
                  trigger: "change",
                },
              ],
              componentProps: {
                options: sOptions,
                disabled: fieldList[i].canEdit == 0,
              },
            });
          } else {
            switch (fieldList[i].fieldKey) {
              case "hidden":
                originList.value.push({
                  field: fieldList[i].fieldKey,
                  component: "RadioGroup",
                  label: fieldList[i].fieldName,
                  defaultValue: fieldList[i].defaultValue,
                  colProps: {
                    span: 12,
                  },
                  rules: [
                    {
                      required: fieldList[i].neetMust == 1,
                      validator: async (rule, value) => {
                        if (!value && fieldList[i].neetMust == 1) {
                          return Promise.reject("值不能为空");
                        }
                        if (value && fieldList[i].regex) {
                          const reg = new RegExp(fieldList[i].regex);
                          if (reg.test(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(fieldList[i].regexFailMsg);
                          }
                        }
                      },
                      trigger: "change",
                    },
                  ],
                  componentProps: {
                    options: sOptions,
                    disabled: fieldList[i].canEdit == 0,
                  },
                  ifShow: ({ values }) => {
                    return values.menu_type == 1 || values.menu_type == 2;
                  },
                });
                break;
              case "is_out":
                originList.value.push({
                  field: fieldList[i].fieldKey,
                  component: "RadioGroup",
                  label: fieldList[i].fieldName,
                  defaultValue: fieldList[i].defaultValue,
                  colProps: {
                    span: 12,
                  },
                  rules: [
                    {
                      required: fieldList[i].neetMust == 1,
                      validator: async (rule, value) => {
                        if (!value && fieldList[i].neetMust == 1) {
                          return Promise.reject("值不能为空");
                        }
                        if (value && fieldList[i].regex) {
                          const reg = new RegExp(fieldList[i].regex);
                          if (!reg.test(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(fieldList[i].regexFailMsg);
                            // return Promise.reject(fieldList[i].regexFailMsg);
                          }
                        }
                      },
                      trigger: "change",
                    },
                  ],
                  componentProps: {
                    options: sOptions,
                    disabled: fieldList[i].canEdit == 0,
                  },
                  ifShow: ({ values }) => {
                    return values.menu_type == 2;
                  },
                });
                break;
              case "out_open_method":
                originList.value.push({
                  field: fieldList[i].fieldKey,
                  component: "RadioGroup",
                  label: fieldList[i].fieldName,
                  defaultValue: fieldList[i].defaultValue,
                  colProps: {
                    span: 24,
                  },
                  rules: [
                    {
                      required: fieldList[i].neetMust == 1,
                      validator: async (rule, value) => {
                        if (!value && fieldList[i].neetMust == 1) {
                          return Promise.reject("值不能为空");
                        }
                        if (value && fieldList[i].regex) {
                          const reg = new RegExp(fieldList[i].regex);
                          if (reg.test(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(fieldList[i].regexFailMsg);
                          }
                        }
                      },
                      trigger: "change",
                    },
                  ],
                  componentProps: {
                    options: sOptions,
                    disabled: fieldList[i].canEdit == 0,
                  },
                  ifShow: ({ values }) => {
                    return values.menu_type == 2;
                  },
                });
                break;
              case "dept_category":
                originList.value.push({
                  field: fieldList[i].fieldKey,
                  component: "RadioGroup",
                  label: fieldList[i].fieldName,
                  defaultValue: fieldList[i].defaultValue,
                  colProps: {
                    span: 24,
                  },
                  rules: [
                    {
                      required: fieldList[i].neetMust == 1,
                      validator: async (rule, value) => {
                        if (!value && fieldList[i].neetMust == 1) {
                          return Promise.reject("值不能为空");
                        }
                        if (value && fieldList[i].regex) {
                          const reg = new RegExp(fieldList[i].regex);
                          if (reg.test(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(fieldList[i].regexFailMsg);
                          }
                        }
                      },
                      trigger: "change",
                    },
                  ],
                  componentProps: ({ formModel }) => {
                    return {
                      options: sOptions,
                      disabled: fieldList[i].canEdit == 0,
                      onChange: () => {
                        // formModel.parentId = null;
                      },
                    };
                  },
                });
                break;
              case "role_type":
                originList.value.unshift({
                  field: fieldList[i].fieldKey,
                  component: "RadioGroup",
                  label: fieldList[i].fieldName,
                  defaultValue: fieldList[i].defaultValue,
                  colProps: {
                    span: 24,
                  },
                  rules: [
                    {
                      required: fieldList[i].neetMust == 1,
                      validator: async (rule, value) => {
                        if (!value && fieldList[i].neetMust == 1) {
                          return Promise.reject("值不能为空");
                        }
                        if (value && fieldList[i].regex) {
                          const reg = new RegExp(fieldList[i].regex);
                          if (reg.test(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(fieldList[i].regexFailMsg);
                          }
                        }
                      },
                      trigger: "change",
                    },
                  ],
                  componentProps: {
                    options: sOptions,
                    disabled: fieldList[i].canEdit == 0,
                    // onChange: (e) => {
                    //   alert(JSON.stringify(e));
                    // },
                  },
                });
                break;
              default:
                originList.value.push({
                  field: fieldList[i].fieldKey,
                  component: "RadioGroup",
                  label: fieldList[i].fieldName,
                  defaultValue: fieldList[i].defaultValue,
                  colProps: {
                    span: 24,
                  },
                  rules: [
                    {
                      required: fieldList[i].neetMust == 1,
                      validator: async (rule, value) => {
                        if (!value && fieldList[i].neetMust == 1) {
                          return Promise.reject("值不能为空");
                        }
                        if (value && fieldList[i].regex) {
                          const reg = new RegExp(fieldList[i].regex);
                          if (reg.test(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(fieldList[i].regexFailMsg);
                          }
                        }
                      },
                      trigger: "change",
                    },
                  ],
                  componentProps: {
                    options: sOptions,
                    disabled: fieldList[i].canEdit == 0,
                    // onChange: (e) => {
                    //   alert(JSON.stringify(e));
                    // },
                  },
                });
            }
          }
        } else {
          switch (fieldList[i].fieldKey) {
            case "component":
              originList.value.push({
                field: fieldList[i].fieldKey,
                component: "Input",
                label: fieldList[i].fieldName,
                defaultValue: fieldList[i].defaultValue,
                colProps: {
                  span: 12,
                },
                rules: [
                  {
                    required: fieldList[i].neetMust == 1,
                    validator: async (rule, value) => {
                      if (!value && fieldList[i].neetMust == 1) {
                        return Promise.reject("值不能为空");
                      }
                      if (value && fieldList[i].regex) {
                        const reg = new RegExp(fieldList[i].regex);
                        if (reg.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(fieldList[i].regexFailMsg);
                        }
                      }
                    },
                    trigger: "change",
                  },
                ],
                componentProps: {
                  placeholder: "请输入" + fieldList[i].fieldName,
                  disabled: fieldList[i].canEdit == 0,
                },
                ifShow: ({ values }) => {
                  return values.menu_type == 2;
                },
              });
              break;
            case "permission":
              originList.value.push({
                field: fieldList[i].fieldKey,
                component: "Input",
                label: fieldList[i].fieldName,
                defaultValue: fieldList[i].defaultValue,
                colProps: {
                  span: 12,
                },
                rules: [
                  {
                    required: fieldList[i].neetMust == 1,
                    validator: async (rule, value) => {
                      if (!value && fieldList[i].neetMust == 1) {
                        return Promise.reject("值不能为空");
                      }
                      if (value && fieldList[i].regex) {
                        const reg = new RegExp(fieldList[i].regex);
                        if (reg.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(fieldList[i].regexFailMsg);
                        }
                      }
                    },
                    trigger: "change",
                  },
                ],
                componentProps: {
                  placeholder: "请输入" + fieldList[i].fieldName,
                  disabled: fieldList[i].canEdit == 0,
                },
                ifShow: ({ values }) => {
                  return values.menu_type == 2 || values.menu_type == 3;
                },
              });
              break;
            case "url":
              originList.value.push({
                field: fieldList[i].fieldKey,
                component: "Input",
                label: fieldList[i].fieldName,
                defaultValue: fieldList[i].defaultValue,
                colProps: {
                  span: 12,
                },
                rules: [
                  {
                    required: fieldList[i].neetMust == 1,
                    validator: async (rule, value) => {
                      if (!value && fieldList[i].neetMust == 1) {
                        return Promise.reject("值不能为空");
                      }
                      if (value && fieldList[i].regex) {
                        const reg = new RegExp(fieldList[i].regex);
                        if (reg.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(fieldList[i].regexFailMsg);
                        }
                      }
                    },
                    trigger: "change",
                  },
                ],
                componentProps: {
                  placeholder: "请输入" + fieldList[i].fieldName,
                  disabled: fieldList[i].canEdit == 0,
                },
                ifShow: ({ values }) => {
                  return values.menu_type == 2 || values.menu_type == 1;
                },
              });
              break;
            case "password":
              originList.value.push({
                field: fieldList[i].fieldKey,
                component: "InputPassword",
                label: fieldList[i].fieldName,
                defaultValue: fieldList[i].defaultValue,
                colProps: {
                  span: 24,
                },
                rules: [
                  {
                    required: fieldList[i].neetMust == 1,
                    validator: async (rule, value) => {
                      if (!value && fieldList[i].neetMust == 1) {
                        return Promise.reject("值不能为空");
                      }
                      if (value && fieldList[i].regex) {
                        const reg = new RegExp(fieldList[i].regex);
                        if (reg.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(fieldList[i].regexFailMsg);
                        }
                      }
                    },
                    trigger: "change",
                  },
                ],
                componentProps: {
                  placeholder: "请输入" + fieldList[i].fieldName,
                  disabled: fieldList[i].canEdit == 0,
                },
              });
              break;
            default:
              originList.value.push({
                field: fieldList[i].fieldKey,
                component: "Input",
                label: fieldList[i].fieldName,
                defaultValue: fieldList[i].defaultValue,
                colProps: {
                  span: 24,
                },
                rules: [
                  {
                    required: fieldList[i].neetMust == 1,
                    validator: async (rule, value) => {
                      if (!value && fieldList[i].neetMust == 1) {
                        return Promise.reject("值不能为空");
                      }
                      if (value && fieldList[i].regex) {
                        const reg = new RegExp(fieldList[i].regex);
                        if (reg.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(fieldList[i].regexFailMsg);
                        }
                      }
                    },
                    trigger: "change",
                  },
                ],
                componentProps: {
                  placeholder: "请输入" + fieldList[i].fieldName,
                  disabled: fieldList[i].canEdit == 0,
                },
              });
          }
        }
        break;
      case "文本":
        // textarea 文本
        originList.value.push({
          field: fieldList[i].fieldKey,
          component: "InputTextArea",
          label: fieldList[i].fieldName,
          defaultValue: fieldList[i].defaultValue,
          colProps: {
            span: 24,
          },
          rules: [
            {
              required: fieldList[i].neetMust == 1,
              validator: async (rule, value) => {
                if (!value && fieldList[i].neetMust == 1) {
                  return Promise.reject("值不能为空");
                }
                if (value && fieldList[i].regex) {
                  const reg = new RegExp(fieldList[i].regex);
                  if (reg.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(fieldList[i].regexFailMsg);
                  }
                }
              },
              trigger: "change",
            },
          ],
          componentProps: {
            placeholder: "请输入" + fieldList[i].fieldName,
            rows: 4,
            disabled: fieldList[i].canEdit == 0,
          },
        });
        break;

      case "数字":
        // 数字类型input
        originList.value.push({
          field: fieldList[i].fieldKey,
          component: "InputNumber",
          label: fieldList[i].fieldName,
          defaultValue: fieldList[i].defaultValue,
          colProps: {
            span: 24,
          },
          rules: [
            {
              required: fieldList[i].neetMust == 1,
              validator: async (rule, value) => {
                if (!value && fieldList[i].neetMust == 1) {
                  return Promise.reject("值不能为空");
                }
                if (value && fieldList[i].regex) {
                  const reg = new RegExp(fieldList[i].regex);
                  if (reg.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(fieldList[i].regexFailMsg);
                  }
                }
              },
              trigger: "change",
            },
          ],
          componentProps: {
            placeholder: "请输入" + fieldList[i].fieldName,
            disabled: fieldList[i].canEdit == 0,
          },
        });
        break;

      case "时间":
        // 时间选择插件
        originList.value.push({
          field: fieldList[i].fieldKey,
          component: "DatePicker",
          label: fieldList[i].fieldName,
          defaultValue: fieldList[i].defaultValue,
          colProps: {
            span: 24,
          },
          rules: [
            {
              required: fieldList[i].neetMust == 1,
              validator: async (rule, value) => {
                if (!value && fieldList[i].neetMust == 1) {
                  return Promise.reject("值不能为空");
                }
                if (value && fieldList[i].regex) {
                  const reg = new RegExp(fieldList[i].regex);
                  if (reg.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(fieldList[i].regexFailMsg);
                  }
                }
              },
              trigger: "change",
            },
          ],
          componentProps: {
            placeholder: "请输入" + fieldList[i].fieldName,
            disabled: fieldList[i].canEdit == 0,
          },
        });
        break;
    }
  }
  return originList;
};
