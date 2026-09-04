<template>
  <!-- :class="bem()" -->
  <div class="flex mb-20px items-center">
    <slot name="headerTitle" v-if="slots.headerTitle"></slot>
    <BasicTitle :helpMessage="helpMessage" v-if="!slots.headerTitle && title">
      {{ title }}
    </BasicTitle>
    <div
      class="flex items-center flex-1 cursor-pointer justify-self-stretch"
      v-if="search || toolbar"
      style="width: 100%"
    >
      <div :class="getInputSearchCls" v-if="search">
        <InputSearch
          :placeholder="`请输入${title}`"
          size="middle"
          allowClear
          v-model:value="searchValue"
          @search="searchInput"
        />
      </div>
      <div v-if="checkable && !hiddenLink" style="margin-left: 10px">
        <a-switch
          v-model:checked="checked"
          checked-children="级联开"
          un-checked-children="级联关"
        />
      </div>

      <div :style="{ width: searchWidth + 'px' }" v-if="isShowBtn"></div>
      <!-- <Dropdown @click.prevent v-if="toolbar">
        <Icon icon="ion:ellipsis-vertical" />
        <template #overlay>
          <Menu @click="handleMenuClick">
            <template v-for="item in toolbarList" :key="item.value">
              <MenuItem v-bind="{ key: item.value }">
                {{ item.label }}
              </MenuItem>
              <MenuDivider v-if="item.divider" />
            </template>
          </Menu>
        </template>
      </Dropdown> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, computed, ref, watch, useSlots, onMounted } from "vue";
import {
  Dropdown,
  Menu,
  MenuItem,
  MenuDivider,
  InputSearch,
  type MenuProps,
} from "ant-design-vue";
import Icon from "components/Icon";
import { BasicTitle } from "components/Basic";
import { useI18n } from "hooks/web/useI18n";
import { useDebounceFn } from "@vueuse/core";
import { createBEM } from "utils/bem";
import { ToolbarEnum } from "../types/tree";

const searchValue = ref("");

const [bem] = createBEM("tree-header");

const props = defineProps({
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  showTitle: {
    type: Boolean,
    default: false,
  },
  toolbar: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  search: {
    type: Boolean,
    default: false,
  },
  searchText: {
    type: String,
    default: "",
  },
  checkAll: {
    type: Function,
    default: undefined,
  },
  expandAll: {
    type: Function,
    default: undefined,
  },
  isLink: {
    type: Boolean,
    default: false,
  },
  isShowBtn: {
    type: Boolean,
    default: false,
  },
  searchWidth: {
    type: String,
    default: "240",
  },
  hiddenLink: {
    type: Boolean,
    default: false,
  },
} as const);
const emit = defineEmits(["strictly-change", "search"]);

const slots = useSlots();
const { t } = useI18n();

const getInputSearchCls = computed(() => {
  const titleExists = slots.headerTitle || props.title;
  return [
    "mr-1",
    "w-full",
    {
      ["ml-5"]: titleExists,
    },
  ];
});

const toolbarList = computed(() => {
  const { checkable } = props;
  const defaultToolbarList = [
    { label: t("component.tree.expandAll"), value: ToolbarEnum.EXPAND_ALL },
    {
      label: t("component.tree.unExpandAll"),
      value: ToolbarEnum.UN_EXPAND_ALL,
      divider: checkable,
    },
  ];

  return checkable
    ? [
        // { label: t('component.tree.selectAll'), value: ToolbarEnum.SELECT_ALL },
        // {
        //   label: t('component.tree.unSelectAll'),
        //   value: ToolbarEnum.UN_SELECT_ALL,
        //   divider: checkable,
        // },
        ...defaultToolbarList,
        {
          label: t("component.tree.checkStrictly"),
          value: ToolbarEnum.CHECK_STRICTLY,
        },
        {
          label: t("component.tree.checkUnStrictly"),
          value: ToolbarEnum.CHECK_UN_STRICTLY,
        },
      ]
    : defaultToolbarList;
});

const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
  switch (key) {
    case ToolbarEnum.SELECT_ALL:
      props.checkAll?.(true);
      break;
    case ToolbarEnum.UN_SELECT_ALL:
      props.checkAll?.(false);
      break;
    case ToolbarEnum.EXPAND_ALL:
      props.expandAll?.(true);
      break;
    case ToolbarEnum.UN_EXPAND_ALL:
      props.expandAll?.(false);
      break;
    case ToolbarEnum.CHECK_STRICTLY:
      emit("strictly-change", false);
      break;
    case ToolbarEnum.CHECK_UN_STRICTLY:
      emit("strictly-change", true);
      break;
  }
};

function emitChange(value?: string): void {
  emit("search", value);
}

const debounceEmitChange = useDebounceFn(emitChange, 200);

watch(
  () => searchValue.value,
  (v) => {
    debounceEmitChange(v);
  },
);

watch(
  () => props.searchText,
  (v) => {
    if (v !== searchValue.value) {
      searchValue.value = v;
    }
  },
);
const searchInput = (e: any) => {
  emit("search", e, "button");
};

const checked = ref(false);
watch(
  () => checked.value,
  (v) => {
    if (v) {
      emit("strictly-change", false);
    } else {
      emit("strictly-change", true);
    }
  },
);

onMounted(() => {
  checked.value = props.isLink;
  if (props.isLink) {
    emit("strictly-change", false);
  } else {
    emit("strictly-change", true);
  }
});
</script>
