<template>
  <!-- 签字弹窗 -->
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="签名"
    destroyOnClose
    centered
    @cancel="handleCancel"
    width="800px"
    :getContainer="propData?.getContainer ?? getPopupContainer"
  >
    <VueSignaturePad id="signature" ref="signaturePad" :options="signOptions" />
    <template #footer>
      <a-button type="primary" danger @click="undo">撤销</a-button>
      <a-button type="primary" danger @click="clear">清屏</a-button>
      <a-button type="primary" @click="save">保存</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref, toRefs, unref } from "vue";
import { BasicModal, useModalInner } from "components/Modal";
import { VueSignaturePad } from "vue-signature-pad";
import { useMessage } from "hooks/web/useMessage";
const { createMessage } = useMessage();

const getPopupContainer = () => document.body;

const emits = defineEmits<{
  (e: "success", k?: any): void;
}>();

const signaturePad = ref<any>(null);
const signOptions = ref<any>({
  penColor: "#000000",
  minWidth: 3, //控制画笔最小宽度
  maxWidth: 3, //控制画笔最大宽度
});
const propData = ref<any>({});
const [registerModal, { closeModal, setModalProps }] = useModalInner(
  async (data) => {
    setModalProps({ confirmLoading: false });
    propData.value = data;
    signaturePad.value?.fromDataURL(
      data.imgSrc,
      signOptions.value,
      handleSuccess,
    );
  },
);
const handleCancel = () => {
  clear();
};
const handleSuccess = () => {};
//撤销
const undo = () => {
  signaturePad.value?.undoSignature();
};
//清除
const clear = () => {
  signaturePad.value?.clearSignature();
};
//保存
const save = () => {
  const { isEmpty, data } = signaturePad.value?.saveSignature();
  emits("success", { imgSrc: data });
  createMessage.success("操作成功");
  //关闭弹窗
  closeModal();
};
onMounted(() => {});
</script>
<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
