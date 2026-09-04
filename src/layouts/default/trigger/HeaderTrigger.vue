<template>
  <!-- :class="[prefixCls, theme]" -->
  <div style="padding-left: 12px; height: 100%; box-sizing: border-box">
    <span :class="[prefixCls]" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="getCollapsed" />
      <MenuFoldOutlined v-else />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { useMenuSetting } from "hooks/setting/useMenuSetting";
import { useDesign } from "hooks/web/useDesign";
import { propTypes } from "utils/propTypes";

export default defineComponent({
  name: "HeaderTrigger",
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
  props: {
    theme: propTypes.oneOf(["light", "dark"]),
  },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();
    const { prefixCls } = useDesign("layout-header-trigger");
    return { getCollapsed, toggleCollapsed, prefixCls };
  },
});
</script>
