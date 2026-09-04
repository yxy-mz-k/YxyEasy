<template>
  <a-row>
    <a-col class="divider-title" :span="24">
      <div class="divider-text">{{ label }}</div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, toRefs } from "vue";

defineOptions({ name: "DividerTitle" });

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});
const { label } = toRefs(props);
</script>
<style scoped lang="scss">
.divider-title {
  padding: 8px 16px;
  margin-bottom: 8px;
  background: #e8f2ff;

  .divider-text {
    padding: 0px 8px;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    border-left: 5px solid #2d8cf0;
  }
}
</style>
