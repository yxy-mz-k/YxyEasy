<template>
  <Header :class="getHeaderClass" class="header-class">
    <div :class="`${prefixCls}-content`">
      <!-- left start -->
      <div :class="`${prefixCls}-left`">
        <!-- logo -->
        <AppLogoHeader
          v-if="getShowHeaderLogo || getIsMobile"
          :class="`${prefixCls}-logo`"
          :theme="getHeaderTheme"
          :style="getLogoWidth"
        />

        <LayoutTrigger
          v-if="
            (getShowContent &&
              getShowHeaderTrigger &&
              !getSplit &&
              !getIsMixSidebar) ||
            getIsMobile
          "
          :theme="getHeaderTheme"
          :sider="false"
        />
        <!-- 此处是顶部标签页切换 -->
        <div class="top_cix">
          <!-- <el-tabs
            v-if="topMenuList.length > 1"
            v-model="activeTab"
            tab-position="top"
            @tab-click="handleTabClick"
          >
            <template v-for="item in topMenuList" :key="item.path">
              <el-tab-pane :label="item.name" :name="item.path" />
            </template>
          </el-tabs> -->

          <a-tabs
            v-model:activeKey="activeKey"
            v-if="topMenuList.length > 1"
            @change="change"
          >
            <a-tab-pane
              v-for="(item, index) in topMenuList"
              :key="index"
              :tab="item.name"
            />
          </a-tabs>
        </div>

        <!-- 123123123123 -->

        <LayoutBreadcrumb
          v-if="getShowContent && getShowBread"
          :theme="getHeaderTheme"
        />
      </div>
      <!-- left end -->

      <!-- menu start -->
      <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu && !getIsMobile">
        <LayoutMenu
          :isHorizontal="true"
          :theme="getHeaderTheme"
          :splitType="getSplitType"
          :menuMode="getMenuMode"
        />
      </div>
      <!-- menu-end -->

      <!-- action  -->
      <div :class="`${prefixCls}-action`">
        <!-- <AppSearch :class="`${prefixCls}-action__item `" v-if="getShowSearch" /> -->

        <!-- <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item error-action`" /> -->

        <!-- <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" /> -->
        <!-- <div style="color: #fff; font-size: 15px; font-weight: 600">{{ userinfo }}</div> -->

        <FullScreen
          v-if="getShowFullScreen"
          :class="`${prefixCls}-action__item fullscreen-item`"
        />

        <UserDropDown :theme="getHeaderTheme" />

        <!-- <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" /> -->
      </div>
    </div>
  </Header>
</template>
<script lang="ts">
import {
  defineComponent,
  unref,
  computed,
  onMounted,
  ref,
  reactive,
} from "vue";

import { propTypes } from "utils/propTypes";

import { Layout } from "ant-design-vue";
import { AppLogoHeader } from "components/Application";
import LayoutMenu from "../menu/index.vue";
import LayoutTrigger from "../trigger/index.vue";

import { AppSearch } from "components/Application";

import { useHeaderSetting } from "hooks/setting/useHeaderSetting";
import { useMenuSetting } from "hooks/setting/useMenuSetting";
import { useRootSetting } from "hooks/setting/useRootSetting";

import { MenuModeEnum, MenuSplitTyeEnum } from "enums/menuEnum";
import { SettingButtonPositionEnum } from "enums/appEnum";
import { AppLocalePicker } from "components/Application";

import {
  UserDropDown,
  LayoutBreadcrumb,
  FullScreen,
  Notify,
  ErrorAction,
} from "./components";
import { useAppInject } from "hooks/web/useAppInject";
import { useDesign } from "hooks/web/useDesign";

import { createAsyncComponent } from "utils/factory/createAsyncComponent";
import { useLocale } from "locales/useLocale";
import { useUserStore } from "store/modules/user";
import { userInfoApi } from "api/sys/user";

import { getMenuList } from "api/sys/menu";
import { router } from "router/index";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    Header: Layout.Header,
    AppLogoHeader,
    LayoutTrigger,
    LayoutBreadcrumb,
    LayoutMenu,
    UserDropDown,
    AppLocalePicker,
    FullScreen,
    Notify,
    AppSearch,
    ErrorAction,
    SettingDrawer: createAsyncComponent(
      () => import("layouts/default/setting/index.vue"),
      {
        loading: true,
      },
    ),
  },
  props: {
    fixed: propTypes.bool,
  },
  setup(props) {
    const { prefixCls } = useDesign("layout-header");
    const {
      getShowTopMenu,
      getShowHeaderTrigger,
      getSplit,
      getIsMixMode,
      getMenuWidth,
      getIsMixSidebar,
    } = useMenuSetting();
    const {
      getUseErrorHandle,
      getShowSettingButton,
      getSettingButtonPosition,
    } = useRootSetting();

    const {
      getHeaderTheme,
      getShowFullScreen,
      getShowNotice,
      getShowContent,
      getShowBread,
      getShowHeaderLogo,
      getShowHeader,
      getShowSearch,
    } = useHeaderSetting();

    const { getShowLocalePicker } = useLocale();

    const { getIsMobile } = useAppInject();
    const userStore = useUserStore();
    const userinfo = ref("");
    const topMenuList = ref([]);
    const activeKey = ref(0);

    onMounted(async () => {
      getTopMenuList();
      //   const TopMenu=await getMenuList({
      //   appId: 'uauth',
      // });
      const data = await userInfoApi();
      var hour = new Date().getHours();
      if (hour < 6) userinfo.value = data.realname + ",凌晨好";
      else if (hour < 9) userinfo.value = data.realname + ",早上好";
      else if (hour < 12) userinfo.value = data.realname + ",上午好";
      else if (hour < 14) userinfo.value = data.realname + ",中午好";
      else if (hour < 17) userinfo.value = data.realname + ",下午好";
      else if (hour < 19) userinfo.value = data.realname + ",傍晚好";
      else if (hour < 22) userinfo.value = data.realname + ",晚上好";
      else {
        userinfo.value = data.realname + ",夜里好";
      }
    });
    const change = (key) => {
      // ver path=topMenuList()
      // 找到exkey为path的值 跳转
      let arr = topMenuList.value[key].exts;
      arr.forEach((item, index) => {
        if (item.extKey == "path") {
          if (item.extValue.indexOf("/") === 0) {
            //  history.replaceState(item.extValue)
            window.location.href = item.extValue;
            // router.replace(item.extValue);
          } else {
            window.location.href = item.extValue;
          }
        }
      });
      // topMenuList[key].forEach(item,index)=>{
      // }
    };

    function GetUrlRelativePath() {
      // var url = document.location.toString();
      // var arrUrl = url.split('//');

      // var start = arrUrl[1].indexOf('/');
      // var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符

      // if (relUrl.indexOf('?') != -1) {
      //   relUrl = relUrl.split('?')[0];
      // }
      var url = document.location.toString();
      var arrUrl = url.split("/").filter(Boolean);
      var relUrl = arrUrl[2];
      return relUrl;
    }
    const getTopMenuList = async () => {
      topMenuList.value = await getMenuList({ appId: "app_mannager_menu" });
      let path = GetUrlRelativePath();
      topMenuList.value.forEach((item, index) => {
        item.exts.forEach((ext) => {
          if (ext.extKey == "path") {
            // if (ext.extValue == path || ext.extValue + '#/home' == path) {
            if (
              ext.extValue == path ||
              new URL(ext.extValue, import.meta.url).pathname.includes(path)
            ) {
              activeKey.value = index;
            }
          }
        });
      });

      if (
        topMenuList.value.every((t: any) => {
          const extValue = t.exts.find(
            (i: any) => i.extKey === "path",
          )?.extValue;
          return (
            extValue !== path &&
            !new URL(extValue, import.meta.url).pathname.includes(path)
          );
        })
      ) {
        if (!topMenuList.value.length) {
        } else {
          const extValue = topMenuList.value[0].exts.find(
            (i: any) => i.extKey == "path",
          )?.extValue;
          activeKey.value = 0;
          const isEnv =
            import.meta.env["MODE"] === "development" ? true : false;
          const origin = isEnv
            ? import.meta.env["VITE_ORIGIN"]
            : window.location.origin;
          window.location.href = origin + extValue + window.location.hash;
        }
      }
    };

    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme);
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
          [`${prefixCls}--${theme}`]: theme,
        },
      ];
    });

    const getShowSetting = computed(() => {
      if (!unref(getShowSettingButton)) {
        return false;
      }
      const settingButtonPosition = unref(getSettingButtonPosition);

      if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
        return unref(getShowHeader);
      }
      return settingButtonPosition === SettingButtonPositionEnum.HEADER;
    });

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode) || unref(getIsMobile)) {
        return {};
      }
      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
      return { width: `${width}px` };
    });

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
    });

    const getMenuMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null;
    });

    return {
      prefixCls,
      getHeaderClass,
      getShowHeaderLogo,
      getHeaderTheme,
      getShowHeaderTrigger,
      getIsMobile,
      getShowBread,
      getShowContent,
      getSplitType,
      getSplit,
      getMenuMode,
      getShowTopMenu,
      getShowLocalePicker,
      getShowFullScreen,
      getShowNotice,
      getUseErrorHandle,
      getLogoWidth,
      getIsMixSidebar,
      getShowSettingButton,
      getShowSetting,
      getShowSearch,
      userinfo,
      activeKey,
      topMenuList,
      change,
    };
  },
});
</script>
<style lang="less">
@import "./index.less";
</style>
