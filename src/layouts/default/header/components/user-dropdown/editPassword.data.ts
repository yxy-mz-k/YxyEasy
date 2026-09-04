import { FormSchema } from "components/Table";

export const editFormSchema: FormSchema[] = [
  {
    field: "oldPw",
    component: "InputPassword",
    label: "旧密码",
    colProps: {
      span: 23,
    },
    componentProps: {
      placeholder: "请输入旧密码",
      onChange: (e) => {},
    },
    rules: [
      {
        required: true,
        message: "旧密码不能为空",
      },
    ],
  },
  {
    field: "newPw",
    component: "InputPassword",
    label: "新密码",
    colProps: {
      span: 23,
    },
    componentProps: {
      placeholder: "请输入新密码",
      onChange: (e) => {},
    },
    rules: [
      {
        required: true,
        validator: (rule, value) => {
          if (!value) {
            return Promise.reject("值不能为空");
          }
          if (value) {
            const reg = new RegExp(
              "^(.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_])[a-zA-Z0-9_@#$%^&+=]*)?(encrypt_.*)?$",
            );
            if (reg.test(value)) {
              return Promise.resolve();
            } else {
              return Promise.reject(
                "密码长度最少8位，至少包含一个大写字母，一个小写字母，数字和特殊字符（_@#$%^&+=）",
              );
            }
          }
        },
        trigger: "change",
      },
    ],
  },
  {
    field: "newPw2",
    component: "InputPassword",
    label: "确认新密码",
    colProps: {
      span: 23,
    },
    componentProps: ({ formModel, schema, tableAction, formActionType }) => {
      return {
        placeholder: "请再次输入新密码",
        onChange: (e) => {
          schema.rules = [
            {
              required: true,
              validator: async (rule, value) => {
                if (!value) {
                  return Promise.reject("值不能为空");
                }
                if (value && value != formModel.newPw) {
                  return Promise.reject("两次密码输入不一致");
                } else if (value && value == formModel.newPw) {
                  const reg = new RegExp(
                    "^(.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_])[a-zA-Z0-9_@#$%^&+=]*)?(encrypt_.*)?$",
                  );
                  if (reg.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "密码长度最少8位，至少包含一个大写字母，一个小写字母，数字和特殊字符（_@#$%^&+=）",
                    );
                  }
                }
              },
              trigger: "change",
            },
          ];
        },
      };
    },
    rules: [
      {
        required: true,
        validator: async (rule, value) => {
          if (!value) {
            return Promise.reject("值不能为空");
          }
          if (value) {
            const reg = new RegExp(
              "^(.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_])[a-zA-Z0-9_@#$%^&+=]*)?(encrypt_.*)?$",
            );
            if (reg.test(value)) {
              return Promise.resolve();
            } else {
              return Promise.reject(
                "密码长度最少8位，至少包含一个大写字母，一个小写字母，数字和特殊字符（_@#$%^&+=）",
              );
            }
          }
        },
        trigger: "change",
      },
    ],
  },
];
