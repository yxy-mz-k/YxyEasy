<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img
      v-if="icon && icon != '' && type == '3'"
      :src="icon"
      class="logo-size"
    />
    <Icon
      v-if="icon && icon != '' && type == '4'"
      :icon="icon"
      class="logo-size"
    />
    <div
      class="truncate md:opacity-100"
      :class="getTitleClass"
      v-show="showTitle"
    >
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, unref, onMounted, ref } from "vue";
// import { useGlobSetting } from 'hooks/setting';
import { useGo } from "hooks/web/usePage";
import { useMenuSetting } from "hooks/setting/useMenuSetting";
import { useDesign } from "hooks/web/useDesign";
import { PageEnum } from "enums/pageEnum";
import { useUserStore } from "store/modules/user";
import { getAppList } from "api/sys/menu";
import { Icon } from "components/Icon";
import { useConfigStore } from "store/modules/config";
const props = defineProps({
  /**
   * The theme of the current parent component
   */
  theme: {
    type: String,
    validator: (v: string) => ["light", "dark"].includes(v),
  },
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },
  /**
   * The title is also displayed when the menu is collapsed
   */
  alwaysShowTitle: { type: Boolean },
});
const icon: any = ref(null);
const type = ref("2");
const title = ref(null);
onMounted(async () => {
  const EASYCONFIG = useConfigStore();
  var dataInfo = await getAppList({
    code: EASYCONFIG?.appId,
    pageNo: 1,
    pageSize: 99,
  });
  if (dataInfo.records.length > 0) {
    icon.value = dataInfo.records[0].icon;
    if (icon.value && icon.value.indexOf("base64") > 0) {
      type.value = "3";
    } else {
      type.value = "4";
    }
    title.value = dataInfo.records[0].name;
  }
});
const { prefixCls } = useDesign("app-logo");
const { getCollapsedShowTitle } = useMenuSetting();
const userStore = useUserStore();
// const { title } = useGlobSetting();
const go = useGo();

const getAppLogoClass = computed(() => [
  prefixCls,
  props.theme,
  { "collapsed-show-title": unref(getCollapsedShowTitle) },
]);

const getTitleClass = computed(() => [
  `${prefixCls}__title`,
  {
    "xs:opacity-0": !props.alwaysShowTitle,
  },
]);

function goHome() {
  go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
}
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-app-logo";

.@{prefix-cls} {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.light {
    // border-bottom: 1px solid @border-color-base;
    box-sizing: border-box;
  }

  &.light:hover,
  &.dark:hover {
    background-color: rgba(#fff, 0.2);
  }

  &.collapsed-show-title {
    padding-left: 20px;
  }

  &.light &__title {
    // color: @primary-color;
    color: @white;
  }

  &.dark &__title {
    color: @white;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }

  .logo-size {
    // width: 70px;
    width: unset;
    height: 34px;
    margin-right: 0;
  }

  .truncate {
    font-size: 25px;
    font-weight: 500;
  }
}
</style>
