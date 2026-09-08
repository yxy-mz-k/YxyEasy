<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="username" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.username"
        placeholder="账号"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="密码"
      />
    </FormItem>

    <FormItem name="captcha" class="enter-x">
      <ARow>
        <ACol :span="20">
          <Input
            size="large"
            v-model:value="formData.captcha"
            placeholder="验证码"
            class="fix-auto-fill"
        /></ACol>
        <ACol :span="4">
          <img
            @click="getVerImageApi()"
            :src="state.verImageUrl"
            style="height: 45px; width: 100%"
          />
        </ACol>
      </ARow>
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            记住我
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button
            type="link"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            忘记密码?
          </Button>
        </FormItem>
      </ACol>
    </ARow>
    <FormItem class="enter-x">
      <Button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >
        登录
      </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { reactive, ref, unref, computed, onMounted } from "vue";

import { Checkbox, Form, Input, Row, Col, Button } from "ant-design-vue";
import LoginFormTitle from "./LoginFormTitle.vue";
import { useMessage } from "hooks/web/useMessage";
import { getVerImage } from "api/sys/user";
import { useUserStore } from "store/modules/user";
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from "./useLogin";
import { useDesign } from "hooks/web/useDesign";
import { VerImageParams } from "api/sys/model/userModel";
//import { onKeyStroke } from '@vueuse/core';
import SMCRYPTO from "miniprogram-sm-crypto";

const ACol = Col;
const ARow = Row;
const FormItem = Form.Item;
const InputPassword = Input.Password;
const { notification, createErrorModal } = useMessage();
const { prefixCls } = useDesign("login");
const userStore = useUserStore();
const { setLoginState, getLoginState } = useLoginState();
const { getFormRules } = useFormRules();

const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const formData = reactive({
  username: "",
  password: "",
  captcha: "",
  checkKey: -1,
});
const state = reactive({
  verImageUrl: "",
});
onMounted(async () => {
  //3.组件挂载到页面之后执行-------onMounted
  // 记住密码
  getVerImageApi();
});
const { validForm } = useFormValid(formRef);

//onKeyStroke('Enter', handleLogin);

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
async function getVerImageApi() {
  formData.checkKey = parseInt(Math.random() * (10000 - 1000 + 1) + 1000, 10);
  let params: VerImageParams = {
    key: formData.checkKey,
  };
  var result = await getVerImage(params);
  state.verImageUrl = result;
}
async function handleLogin() {
  const data = await validForm();
  if (!data) return;
  try {
    loading.value = true;
    const sm3 = SMCRYPTO.sm3;
    const userInfo = await userStore.login({
      captcha: formData.captcha,
      checkKey: formData.checkKey,
      password: sm3(formData.username + formData.password),
      username: formData.username,
      sort: 1,
    });
    if (userInfo) {
      notification.success({
        message: "登录成功",
        description: `欢迎回来: ${userInfo.realname}`,
        duration: 3,
      });
    } else {
      //刷新验证码
      getVerImageApi();
    }
  } catch (error) {
    getVerImageApi();
  } finally {
    loading.value = false;
  }
}
</script>
