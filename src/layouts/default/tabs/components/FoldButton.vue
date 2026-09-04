<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" />
  </span>
</template>
<script lang="ts">
import { defineComponent, unref, computed } from "vue";
import { Icon } from "components/Icon";

import { useDesign } from "hooks/web/useDesign";
import { useHeaderSetting } from "hooks/setting/useHeaderSetting";
import { useMenuSetting } from "hooks/setting/useMenuSetting";
import { triggerWindowResize } from "utils/event";
import { useRoute } from "vue-router";
import { useAppStore } from "store/modules/app";
import Mitt from "utils/myMitt";
import { useConfigStore } from "store/modules/config";

export default defineComponent({
  name: "FoldButton",
  components: { Icon },
  setup() {
    const { prefixCls } = useDesign("multiple-tabs-content");
    const { getShowMenu, setMenuSetting } = useMenuSetting();
    const { getShowHeader, setHeaderSetting } = useHeaderSetting();

    const getIsUnFold = computed(
      () => !unref(getShowMenu) && !unref(getShowHeader),
    );

    const getIcon = computed(() =>
      unref(getIsUnFold) ? "codicon:screen-normal" : "codicon:screen-full",
    );

    const appStore = useAppStore();
    const route = useRoute();

    function handleFold(exitFold: any = null) {
      const EASYCONFIG = useConfigStore();
      let isUnFold: any = null;
      if (typeof exitFold == "boolean") {
        isUnFold = exitFold;
      } else {
        isUnFold = getIsUnFold.value;
      }

      setMenuSetting({
        show: isUnFold,
        hidden: !isUnFold,
      });
      setHeaderSetting({ show: isUnFold });
      triggerWindowResize();

      if (route.name == `${EASYCONFIG.key}_home`) {
        appStore.setProjectConfig({
          fullContent: !isUnFold,
          showSettingButton: isUnFold,
        });
        Mitt.emit("homs_home_resize");
      }
    }

    const handleKeydown = (e: any) => {
      if (e.key === "Escape") {
        handleFold(true);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return { prefixCls, getIcon, handleFold };
  },
});
</script>
