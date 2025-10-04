<template>
  <div class="page-left">
    <div class="searchFormAdd" v-if="attrs?.canEdit">
      <slot name="treeHandle">
        <a-space>
          <a-button type="primary" @click="handleCreate">
            <template #icon>
              <plus-outlined />
            </template>
            新增
          </a-button>
        </a-space>
      </slot>
    </div>
    <!-- <BasicTree
      v-bind="attrs"
      ref="BasicTreeRef"
      :style="
        attrs?.treeStyle ? attrs?.treeStyle : 'height: calc(100vh - 255px)'
      "
      @select="changeSelectedKeys"
      showTitle:false
      :blockNode="true"
      :checkable="false"
      hiddenLink
      :search="
        attrs?.search != null && attrs?.search != undefined
          ? attrs?.search
          : true
      "
      toolbar
      :isShowBtn="true"
      :searchWidth="
        attrs?.searchWidth ? attrs?.searchWidth : attrs?.canEdit ? 145 : 0
      "
      v-model:selectedKeys="selectedKeys"
      @search="searchTree"
    >
      <template #title="item">
        <div class="tree-solt">
          <div class="treetitle">
            <slot name="treeLabel" :item="item">
              {{ item?.[attrs?.fieldNames?.title] }}
            </slot>
          </div>
          <div class="tree-btn" v-if="attrs?.canEdit">
            <a-space>
              <slot name="treeEditBasicReplenish" :item="item"></slot>
              <slot name="treeEditBasic" :item="item">
                <form-outlined
                  @click.stop="handleEdit(item)"
                  style="color: #0960bd"
                />
                <a-popconfirm
                  @click.stop
                  title="确认删除吗?"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm.stop="onDelete(item)"
                >
                  <delete-outlined style="color: #ff5f5f" />
                </a-popconfirm>
              </slot>
              <slot name="treeEditBasicSuffixReplenish" :item="item"></slot>
            </a-space>
          </div>
        </div>
      </template>

      <template v-for="(_, k) in slots" #[k]="slotProps">
        <slot :name="k" v-bind="slotProps ?? {}"></slot>
      </template>
    </BasicTree> -->
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  shallowRef,
  toRefs,
  reactive,
  onMounted,
  watch,
  computed,
  getCurrentInstance,
  nextTick,
  h,
  useAttrs,
  useSlots,
} from "vue";
const attrs: any = useAttrs();
const slots: any = useSlots();

const emits = defineEmits<{
  (e: "search", k?: any): void;
  (e: "select", k?: any, v?: any, c?: any): void;
  (e: "addTree", k?: any, v?: any): void;
  (e: "editTree", k?: any, v?: any): void;
  (e: "deleteTree", k?: any, v?: any): void;
}>();

// import { BasicTree } from "components/Tree/index";
const selectedKeys = ref<string[]>([]);

const searchTree = (e: any) => {
  emits("search", e);
};
const changeSelectedKeys = (e: any, row: any) => {
  const nameArr = row?.selectedNodes?.map(
    (r: any) => r?.[attrs?.fieldNames?.name]
  );
  emits("select", e, row, nameArr);
};
const handleCreate = () => {
  emits("addTree");
};
// 编辑数据
const handleEdit = async (record: Recordable) => {
  emits("editTree", record);
};
// 删除数据
const onDelete = async (record: Recordable) => {
  emits("deleteTree", record);
};

const BasicTreeRef = ref();

const selectRows = ref<any>({});
const getInitRow = (data: any, key: any) => {
  data?.map((d: any, dindex: number, self: any) => {
    const findIndex = self.findIndex(
      (s: any) => s?.[attrs?.fieldNames?.key || "id"] == key
    );
    if (findIndex > -1) {
      selectRows.value = Object.assign({}, self[findIndex]);
    } else {
      self?.map((s: any) => {
        if (s?.[attrs?.fieldNames?.children || "children"]?.length) {
          getInitRow(s?.children, key);
        }
      });
    }
  });
};
const handleInitFirstSelect = () => {
  if (attrs?.selectFirst) {
    let newdata = attrs?.treeData?.filter((item) => {
      return (
        !item?.hasOwnProperty(attrs?.fieldNames?.["parentId"]) ||
        item?.[attrs?.fieldNames?.["parentId"]] == null
      );
    });
    if (!attrs?.selectedKeys?.length) {
      selectedKeys.value = newdata?.length
        ? [newdata?.[0]?.[attrs?.fieldNames?.key || "id"]]
        : [];
      if (attrs?.treeData?.length) {
        emits(
          "select",
          [newdata?.[0]?.[attrs?.fieldNames?.key || "id"]],
          { selectedNodes: [newdata?.[0]] },
          newdata?.[0]?.[attrs?.fieldNames?.name]
        );
      }
    } else {
      selectedKeys.value = attrs?.selectedKeys;
      getInitRow(attrs?.treeData, attrs?.selectedKeys?.[0]);

      emits(
        "select",
        attrs?.selectedKeys,
        { selectedNodes: [selectRows.value] },
        selectRows.value?.[attrs?.fieldNames?.name]
      );
    }
  } else {
    emits("select", [""], { selectedNodes: [] }, []);
  }
  if (attrs?.defaultExpandAll) {
    nextTick(() => {
      BasicTreeRef.value?.expandAll(true);
    });
  }
};

watch(
  () => attrs?.treeData,
  (n: any) => {
    if (n?.length) {
      handleInitFirstSelect();
    }
  },
  {
    deep: true,
  }
);

onMounted(async () => {
  selectRows.value = {};
  // handleInitFirstSelect();
});
</script>
<style lang="scss" scoped></style>
