<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="修改密码"
    @ok="handleSubmit"
    width="500px"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, unref, onMounted } from "vue";
import { EditPasswordApi } from "api/sys/user";
import { editFormSchema } from "./editPassword.data";
import { BasicModal, useModalInner } from "components/Modal";
import { BasicForm, useForm } from "components/Form/index";
import { useMessage } from "hooks/web/useMessage";
import { useUserStore } from "store/modules/user";
import { doLogout } from "api/sys/user";
import { router } from "router/index";
import { PageEnum } from "enums/pageEnum";
export default defineComponent({
  components: { BasicModal, BasicForm },
  props: {
    userData: { type: Object },
  },
  emits: ["success", "register"],
  setup(props, { emit }) {
    const modelRef = ref({});
    const rowId = ref("");
    const title = ref("");
    const columnList: any = ref([]);
    const { createMessage } = useMessage();
    const userStore = useUserStore();
    const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
      labelWidth: 120,
      schemas: columnList,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
      },
    });

    const [registerModal, { closeModal, setModalProps }] = useModalInner(
      async () => {
        setModalProps({ confirmLoading: false });

        // columnList.value = JSON.parse(JSON.stringify(editFormSchema));
        columnList.value = editFormSchema;
        resetFields();
      },
    );
    onMounted(() => {});

    async function handleSubmit() {
      const values = await validate();
      // values.id = userStore.getUserInfo.id;
      values.userName = userStore.getUserInfo.username;
      const result = await EditPasswordApi(values);
      if (result) {
        handleSuccess();
      } else {
        createMessage.error("修改失败，请仔细检查相关密码");
      }
    }
    // 操作成功
    async function handleSuccess() {
      //重置表单
      resetFields();
      createMessage.success("修改成功");
      //关闭弹窗
      closeModal();
      await doLogout();
      userStore.setToken(undefined);
      userStore.setSessionTimeout(false);
      userStore.setUserInfo(null);
      // router.push(PageEnum.BASE_LOGIN);
      window.location.reload();
    }
    return {
      registerModal,
      closeModal,
      registerForm,
      model: modelRef,
      setModalProps,
      setFieldsValue,
      handleSubmit,
      title,
      userStore,
    };
  },
});
</script>
