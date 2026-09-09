<template>
  <div class="page-parent">
    <PageLayout>
      <div class="page-parent-content page-parent-content-index">
        欢迎使用{{ getGlobalConfig()?.name }}
      </div>
    </PageLayout>
  </div>
</template>
<script setup lang="ts">
import PageLayout from "components/Y-PageLayout/index.vue";
import { getGlobalConfig } from "utils/global";
</script>
<style lang="scss" scoped>
.page-parent-content-index {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 96px;
  color: #000;
}
</style>
