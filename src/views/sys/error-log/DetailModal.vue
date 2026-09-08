<template>
  <BasicModal :width="800" title="详情" v-bind="$attrs">
    <Description :data="info" @register="register" />
  </BasicModal>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { ErrorLogInfo } from "types/store";
import { BasicModal } from "components/Modal/index";
import { Description, useDescription } from "components/Description/index";
import { getDescSchema } from "./data";

defineProps({
  info: {
    type: Object as PropType<ErrorLogInfo>,
    default: null,
  },
});

const [register] = useDescription({
  column: 2,
  schema: getDescSchema()!,
});
</script>
