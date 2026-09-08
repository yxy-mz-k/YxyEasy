<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="流程"
    :centered="true"
    :destroyOnClose="true"
    :footer="false"
    :width="900"
  >
    <iframe
      :src="src"
      width="100%"
      height="100%"
      allowfullscreen
      frameborder="0"
    ></iframe>
  </BasicModal>
</template>
<script lang="ts" setup>
import { defineComponent, ref, unref, onMounted, reactive, toRefs } from "vue";
import { BasicModal, useModalInner } from "components/Modal";
import { useMessage } from "hooks/web/useMessage";
const { createMessage } = useMessage();
import { globalConfig } from "utils/global.js";

import { useUserStore, useUserStoreWithOut } from "store/modules/user";
const userStore = useUserStoreWithOut();

const propData = ref<any>({});
const [register, { closeModal, setModalProps, changeOkLoading }] =
  useModalInner(async (data) => {
    propData.value = data;
    // iframe嵌入
    src.value = `${globalConfig?.VITE_ORIGIN}/center/#/flow?id=${
      data?.record?.[data?.prop || "taskId"]
    }&&isSilentMode=true&&user_token=${userStore.getToken}`;
  });

const emits = defineEmits<{
  (e: "success", k?: any): void;
}>();

const src = ref("");

onMounted(async () => {});
</script>
