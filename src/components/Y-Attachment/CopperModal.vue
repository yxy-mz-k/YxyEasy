<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    centered
    destroyOnClose
    title="图片裁剪"
    width="800px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="modal-form" v-if="show">
      <div class="modal-form-crop">
        <CropperImage
          ref="refCropper"
          v-bind="propData"
          @cropend="handleCropend"
        />
      </div>
      <div class="modal-form-preview">
        <div
          :class="[
            `modal-form-preview-preview`,
            {
              [`modal-form-preview-preview-circle`]: propData?.circled ?? true,
            },
          ]"
        >
          <img :src="cropperImg" v-if="cropperImg" alt="裁剪后的图片" />
        </div>
        <template v-if="cropperImg && (propData?.circled ?? true)">
          <div :class="`modal-form-preview-group`">
            <Avatar :src="cropperImg" size="large" />
            <Avatar :src="cropperImg" :size="48" />
            <Avatar :src="cropperImg" :size="64" />
            <Avatar :src="cropperImg" :size="80" />
          </div>
        </template>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watch,
  computed,
  nextTick,
  onUnmounted,
  onBeforeUnmount,
  defineComponent,
} from "vue";
import { BasicModal, useModalInner } from "components/Modal";
import { Space, Upload, Avatar, Tooltip } from "ant-design-vue";
const propData = ref<any>({});
const show = ref(false);

const [register, { closeModal, changeOkLoading }] = useModalInner(
  (data: any) => {
    propData.value = data;
    show.value = true;
  },
);
const emits = defineEmits<{
  (e: "success", k?: any): void;
}>();

const handleCancel = () => {
  show.value = false;
  cropperImg.value = "";
  cropInfo.value = {};
  cropBlob.value = null;
  closeModal();
};
const handleOk = async () => {
  changeOkLoading(true);
  if (propData.value?.DirectlyFile) {
    emits("success", {
      source: cropperImg.value,
      data: cropBlob.value,
      cropInfo: cropInfo.value,
      uid: propData.value?.uid,
    });
  } else {
    const result = await propData.value?.uploadApi({
      file: cropBlob.value,
    });
    emits("success", {
      source: cropperImg.value,
      data: result.data,
      cropInfo: cropInfo.value,
      uid: propData.value?.uid,
    });
  }
  changeOkLoading(false);
  handleCancel();
};

import { CropperImage } from "components/Cropper";
const cropperImg = ref("");
const cropInfo = ref<any>({});
const cropBlob = ref<any>(null);
const handleCropend = ({ imgBase64, imgInfo, blob }) => {
  cropperImg.value = imgBase64;
  cropInfo.value = imgInfo;

  blob.name = propData.value?.name;
  cropBlob.value = blob;
};
</script>
<style lang="scss" scoped>
.modal-form {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  // align-items: center;
  column-gap: 12px;

  &-crop {
    // flex: 1;
    width: 55%;
    height: 340px;
  }

  &-preview {
    height: 340px;
    width: 45%;

    &-preview {
      width: 220px;
      height: 220px;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid #d9d9d9;

      img {
        width: 100%;
        height: 100%;
      }
    }
    &-preview-circle {
      border-radius: 50%;
    }

    &-group {
      display: flex;
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid #d9d9d9;
      justify-content: space-around;
      align-items: center;
    }
    // width: 100px;
    // height: 100px;
  }
}
</style>
