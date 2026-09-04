<template>
  <Footer
    :class="prefixCls"
    v-if="getShowLayoutFooter"
    ref="footerRef"
    class="footer"
  >
    <!-- <div :class="`${prefixCls}__links`">
      <a @click="openWindow(SITE_URL)">{{ t('layout.footer.onlinePreview') }}</a>

      <GithubFilled @click="openWindow(GITHUB_URL)" :class="`${prefixCls}__github`" />

      <a @click="openWindow(DOC_URL)">{{ t('layout.footer.onlineDocument') }}</a>
    </div> -->
    <div style="color: rgba(0, 0, 0, 0.6)">
      江苏阿克曼环保科技有限公司 ©2023版权所有。
      <!-- <a-button type="link" href=" https://beian.miit.gov.cn/" target="_blank">
        苏ICP备2023049619号-2
      </a-button> -->
    </div>
  </Footer>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref } from "vue";
import { Layout } from "ant-design-vue";

import { GithubFilled } from "@ant-design/icons-vue";

import { DOC_URL, GITHUB_URL, SITE_URL } from "settings/siteSetting";
import { openWindow } from "utils/index";

import { useI18n } from "hooks/web/useI18n";
import { useRootSetting } from "hooks/setting/useRootSetting";
import { useRouter } from "vue-router";
import { useDesign } from "hooks/web/useDesign";
import { useLayoutHeight } from "../content/useContentViewHeight";

export default defineComponent({
  name: "LayoutFooter",
  components: { Footer: Layout.Footer, GithubFilled },
  setup() {
    const { t } = useI18n();
    const { getShowFooter } = useRootSetting();
    const { currentRoute } = useRouter();
    const { prefixCls } = useDesign("layout-footer");

    const footerRef = ref<ComponentRef>(null);
    const { setFooterHeight } = useLayoutHeight();

    const getShowLayoutFooter = computed(() => {
      if (unref(getShowFooter)) {
        const footerEl = unref(footerRef)?.$el;
        setFooterHeight(footerEl?.offsetHeight || 0);
      } else {
        setFooterHeight(0);
      }
      return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
    });

    return {
      getShowLayoutFooter,
      prefixCls,
      t,
      DOC_URL,
      GITHUB_URL,
      SITE_URL,
      openWindow,
      footerRef,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-layout-footer";

@normal-color: rgba(0, 0, 0, 0.45);

@hover-color: rgba(0, 0, 0, 0.85);

.@{prefix-cls} {
  color: @normal-color;
  text-align: center;

  &__links {
    margin-bottom: 8px;

    a {
      color: @normal-color;

      &:hover {
        color: @hover-color;
      }
    }
  }

  &__github {
    margin: 0 30px;

    &:hover {
      color: @hover-color;
    }
  }
}

.footer {
  padding: 0 0 12px 0;
  box-sizing: border-box;
}
</style>
