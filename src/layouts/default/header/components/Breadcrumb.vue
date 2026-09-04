<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <!-- <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <Icon :icon="getIcon(route)" v-if="getShowBreadCrumbIcon && getIcon(route)" />
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ t(route.name || route.meta.title) }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ t(route.name || route.meta.title) }}
        </router-link>
      </template>
    </a-breadcrumb> -->

    <!-- <div class="text-black">
      <a-tabs v-model:activeKey="activeKey" @change="changeTabClick">
        <a-tab-pane v-for="item in appList" :key="item.code" :tab="item.name" />
      </a-tabs>
    </div> -->
  </div>
</template>
<script lang="ts">
import type { RouteLocationMatched } from "vue-router";
import { useRouter } from "vue-router";
import type { Menu } from "router/types";

import { defineComponent, ref, watchEffect, onMounted } from "vue";

import { Breadcrumb } from "ant-design-vue";
import Icon from "components/Icon";

import { useDesign } from "hooks/web/useDesign";
import { useRootSetting } from "hooks/setting/useRootSetting";
import { useGo } from "hooks/web/usePage";
import { useI18n } from "hooks/web/useI18n";

import { propTypes } from "utils/propTypes";
import { isString } from "utils/is";
import { filter } from "utils/helper/treeHelper";
import { getMenus } from "router/menus";

import { REDIRECT_NAME } from "router/constant";
import { getAllParentPath } from "router/helper/menuHelper";
import { getSysResourceBelong } from "api/sys/resource";
import { SysSourceTypeEnum } from "enums/sysEnum";

export default defineComponent({
  name: "LayoutBreadcrumb",
  components: { Icon, [Breadcrumb.name]: Breadcrumb },
  props: {
    theme: propTypes.oneOf(["dark", "light"]),
  },
  setup() {
    const routes = ref<RouteLocationMatched[]>([]);
    const { currentRoute } = useRouter();
    const { prefixCls } = useDesign("layout-breadcrumb");
    const { getShowBreadCrumbIcon } = useRootSetting();
    const go = useGo();
    const activeKey = ref("uauth");
    const appList: any = ref([]);
    const { t } = useI18n();
    watchEffect(async () => {
      if (currentRoute.value.name === REDIRECT_NAME) return;
      const menus = await getMenus();

      const routeMatched = currentRoute.value.matched;
      const cur = routeMatched?.[routeMatched.length - 1];
      let path = currentRoute.value.path;

      if (cur && cur?.meta?.currentActiveMenu) {
        path = cur.meta.currentActiveMenu as string;
      }

      const parent = getAllParentPath(menus, path);
      const filterMenus = menus.filter((item) => item.path === parent[0]);
      const matched = getMatched(filterMenus, parent) as any;

      if (!matched || matched.length === 0) return;

      const breadcrumbList = filterItem(matched);

      if (currentRoute.value.meta?.currentActiveMenu) {
        breadcrumbList.push({
          ...currentRoute.value,
          name: currentRoute.value.meta?.title || currentRoute.value.name,
        } as unknown as RouteLocationMatched);
      }
      routes.value = breadcrumbList;
    });
    onMounted(async () => {
      // appList.value = [];
      // let data = await getSysResourceBelong({
      //   sourceType: SysSourceTypeEnum.APP,
      //   belongMethod: '3',
      // });
      // data.forEach((element) => {
      //   if (element.exts) {
      //     let newArr = {};
      //     element.exts.map((itm) => {
      //       newArr[itm.extKey] = itm.extValue;
      //     });
      //     element = Object.assign(element, newArr);
      //     if (element.auth_page || element.code == 'uauth') {
      //       appList.value.push(element);
      //     }
      //   }
      // });
    });
    const changeTabClick = () => {
      appList.value.forEach((e) => {
        if (e.code == activeKey.value) {
          window.open(e.auth_page, "_self");
        }
      });
    };

    function getMatched(menus: Menu[], parent: string[]) {
      const metched: Menu[] = [];
      menus.forEach((item) => {
        if (parent.includes(item.path)) {
          metched.push({
            ...item,
            name: item.meta?.title || item.name,
          });
        }
        if (item.children?.length) {
          metched.push(...getMatched(item.children, parent));
        }
      });
      return metched;
    }

    function filterItem(list: RouteLocationMatched[]) {
      return filter(list, (item) => {
        const { meta, name } = item;
        if (!meta) {
          return !!name;
        }
        const { title, hideBreadcrumb, hideMenu } = meta;
        if (!title || hideBreadcrumb || hideMenu) {
          return false;
        }
        return true;
      }).filter((item) => !item.meta?.hideBreadcrumb);
    }

    function handleClick(
      route: RouteLocationMatched,
      paths: string[],
      e: Event,
    ) {
      e?.preventDefault();
      const { children, redirect, meta } = route;

      if (children?.length && !redirect) {
        e?.stopPropagation();
        return;
      }
      if (meta?.carryParam) {
        return;
      }

      if (redirect && isString(redirect)) {
        go(redirect);
      } else {
        let goPath = "";
        if (paths.length === 1) {
          goPath = paths[0];
        } else {
          const ps = paths.slice(1);
          const lastPath = ps.pop() || "";
          goPath = `${lastPath}`;
        }
        goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
        go(goPath);
      }
    }

    function hasRedirect(
      routes: RouteLocationMatched[],
      route: RouteLocationMatched,
    ) {
      return routes.indexOf(route) !== routes.length - 1;
    }

    function getIcon(route) {
      return route.icon || route.meta?.icon;
    }

    return {
      routes,
      t,
      prefixCls,
      getIcon,
      getShowBreadCrumbIcon,
      handleClick,
      hasRedirect,
      activeKey,
      appList,
      changeTabClick,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-layout-breadcrumb";

.@{prefix-cls} {
  display: flex;
  padding: 0 8px;
  align-items: center;

  .ant-breadcrumb-link {
    .anticon {
      margin-right: 4px;
      margin-bottom: 2px;
    }
  }

  &--light {
    .ant-breadcrumb-link {
      color: @breadcrumb-item-normal-color;

      a {
        color: rgb(0 0 0 / 65%);

        &:hover {
          color: @primary-color;
        }
      }
    }

    .ant-breadcrumb-separator {
      color: @breadcrumb-item-normal-color;
    }
  }

  &--dark {
    .ant-breadcrumb-link {
      color: rgb(255 255 255 / 60%);

      a {
        color: rgb(255 255 255 / 80%);

        &:hover {
          color: @white;
        }
      }
    }

    .ant-breadcrumb-separator,
    .anticon {
      color: rgb(255 255 255 / 80%);
    }
  }
}
</style>
<style>
.text-black > .ant-tabs > .ant-tabs-nav,
.ant-tabs > div > .ant-tabs-nav {
  margin: 0px !important;
}
</style>
