import type { App } from "vue";
import { withInstall } from "utils/withInstall";
import { componentRegistry } from "utils/registry";

import YCharts from "./Y-Charts";
import YToolTip from "./Y-ToolTip";
import YSortableList from "./Y-SortableList";
import YWebWinVideo from "./Y-WebWinVideo";
import YSplitpanes from "./Y-Splitpanes";
import YClipboard from "./Y-Clipboard";
import YPageLayout from "./Y-PageLayout";
import YLeftProjectTree from "./Y-LeftProjectTree";
// 按需引入
const allComponents = [
  YCharts,
  YClipboard,
  YLeftProjectTree,
  YPageLayout,
  YSortableList,
  YSplitpanes,
  YToolTip,
  YWebWinVideo,
];

import * as ApplicationComponents from "./Application";
Object.values(ApplicationComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as AuthorityComponents from "./Authority";
// 处理 Application 组件（已经有 install）
Object.values(AuthorityComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as BasicComponents from "./Basic";
// 处理 Application 组件（已经有 install）
Object.values(BasicComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as ButtonComponents from "./Button";
import { type ButtonProps } from "./Button";
// 处理 Application 组件（已经有 install）
Object.values(ButtonComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as CardListComponents from "./CardList";
// 处理 Application 组件（已经有 install）
Object.values(CardListComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as ClickOutSideComponents from "./ClickOutSide";
// 处理 Application 组件（已经有 install）
Object.values(ClickOutSideComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as CodeEditorComponents from "./CodeEditor";
// 处理 Application 组件（已经有 install）
Object.values(CodeEditorComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as ContainerComponents from "./Container";
// 处理 Application 组件（已经有 install）
Object.values(ContainerComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import ContextMenuModule, {
  createContextMenu,
  destroyContextMenu,
  ContextMenu,
} from "./ContextMenu";
// 添加 ContextMenu 组件
if (ContextMenu) {
  allComponents.push(ContextMenu);
}

import * as CountDownComponents from "./CountDown";
// 处理 Application 组件（已经有 install）
Object.values(CountDownComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as CountToComponents from "./CountTo";
// 处理 Application 组件（已经有 install）
Object.values(CountToComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as CropperComponents from "./Cropper";
// 处理 Application 组件（已经有 install）
Object.values(CropperComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as DescriptionComponents from "./Description";
// 处理 Application 组件（已经有 install）
Object.values(DescriptionComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as DivideTitleComponents from "./DivideTitle";
// 处理 Application 组件（已经有 install）
Object.values(DivideTitleComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as DrawerComponents from "./Drawer";
// 处理 Application 组件（已经有 install）
Object.values(DrawerComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as DropdownComponents from "./Dropdown";
// 处理 Application 组件（已经有 install）
Object.values(DropdownComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as EllipsisTextComponents from "./EllipsisText";
// 处理 Application 组件（已经有 install）
Object.values(EllipsisTextComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as ExcelComponents from "./Excel";
// 处理 Application 组件（已经有 install）
Object.values(ExcelComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as FlowChartComponents from "./FlowChart";
// 处理 Application 组件（已经有 install）
Object.values(FlowChartComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as FormComponents from "./Form";
// 处理 Application 组件（已经有 install）
Object.values(FormComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as IconComponents from "./Icon";
// 处理 Application 组件（已经有 install）
Object.values(IconComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as LoadingComponents from "./Loading";
// 处理 Application 组件（已经有 install）
Object.values(LoadingComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as MarkdownComponents from "./Markdown";
// 处理 Application 组件（已经有 install）
Object.values(MarkdownComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as MenuComponents from "./Menu";
// 处理 Application 组件（已经有 install）
Object.values(MenuComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as ModalComponents from "./Modal";
// 处理 Application 组件（已经有 install）
Object.values(ModalComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as PageComponents from "./Page";
// 处理 Application 组件（已经有 install）
Object.values(PageComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as PreviewComponents from "./Preview";
// 处理 Application 组件（已经有 install）
Object.values(PreviewComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import PromptModule, { createPrompt, genFormSchemas, Dialog } from "./Prompt";
// 添加 Prompt 的 Dialog 组件
if (Dialog) {
  allComponents.push(Dialog);
}

import * as QrcodeComponents from "./Qrcode";
// 处理 Application 组件（已经有 install）
Object.values(QrcodeComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as ScrollbarComponents from "./Scrollbar";
export type { ScrollbarType } from "./Scrollbar/src/types";
// 处理 Application 组件（已经有 install）
Object.values(ScrollbarComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as SimpleMenuComponents from "./SimpleMenu";
// 处理 Application 组件（已经有 install）
Object.values(SimpleMenuComponents).forEach((comp: any) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp as any);
  }
});

import * as StrengthMeterComponents from "./StrengthMeter";
// 处理 Application 组件（已经有 install）
Object.values(StrengthMeterComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as TableComponents from "./Table";
// 处理 Application 组件（已经有 install）
Object.values(TableComponents).forEach((comp: any) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp as any);
  }
});

import * as TimeComponents from "./Time";
// 处理 Application 组件（已经有 install）
Object.values(TimeComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as TinymceComponents from "./Tinymce";
// 处理 Application 组件（已经有 install）
Object.values(TinymceComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import { transitionComponents } from "./Transition";

import * as TreeComponents from "./Tree";
// 处理 Application 组件（已经有 install）
Object.values(TreeComponents).forEach((comp: any) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp as any);
  }
});

import * as UploadComponents from "./Upload";
// 处理 Application 组件（已经有 install）
Object.values(UploadComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as VerifyComponents from "./Verify";
// 处理 Application 组件（已经有 install）
Object.values(VerifyComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as VirtualScrollComponents from "./VirtualScroll";
// 处理 Application 组件（已经有 install）
Object.values(VirtualScrollComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

// 确保所有组件都有 install 方法
const normalizedComponents = allComponents.map((comp) => {
  if (!comp.install) {
    return withInstall(comp);
  }
  return comp;
});

// 注册所有组件
componentRegistry.registerAll(normalizedComponents);

// 定义 install 方法
const install = (app: App) => {
  componentRegistry.install(app);

  // 注册 ContextMenu 到全局属性
  app.config.globalProperties.$contextMenu = {
    create: createContextMenu,
    destroy: destroyContextMenu,
  };

  // 额外注册 Transition 组件（确保名称正确）
  transitionComponents.forEach((component: any) => {
    if (component.name && !app.component(component.name)) {
      app.component(component.name, component);
    }
  });

  app.config.globalProperties.$prompt = createPrompt;
};

export {
  YCharts,
  YToolTip,
  YSortableList,
  YWebWinVideo,
  YSplitpanes,
  YClipboard,
  YPageLayout,
  YLeftProjectTree,
};

export type { ButtonProps };

export const {
  AppLogo,
  AppLogoHeader,
  AppProvider,
  AppSearch,
  AppLocalePicker,
  AppDarkModeToggle,
} = ApplicationComponents;
export { useAppProviderContext } from "./Application";

export const { Authority } = AuthorityComponents;

export const { BasicArrow, BasicTitle, BasicHelp } = BasicComponents;

export const { Button, PopConfirmButton } = ButtonComponents;

export const { CardList } = CardListComponents;

export const { ClickOutSide } = ClickOutSideComponents;

export const { CodeEditor, JsonPreview, HighJsonView } = CodeEditorComponents;
export * from "./CodeEditor/src/typing";

export const { CollapseContainer, ScrollContainer, LazyContainer } =
  ContainerComponents;
export * from "./Container/src/typing";

export { ContextMenu } from "./ContextMenu";
export { createContextMenu, destroyContextMenu } from "./ContextMenu";
export * from "./ContextMenu/src/typing";

export const { CountdownInput, CountButton } = CountDownComponents;

export const { CountTo } = CountToComponents;

export const { CropperImage, CropperAvatar } = CropperComponents;
export * from "./Cropper/src/typing";

export const { Description } = DescriptionComponents;
export { useDescription } from "./Description";
export * from "./Description/src/typing";

export const { DivideTitle } = DivideTitleComponents;

export const { BasicDrawer } = DrawerComponents;
export { useDrawer, useDrawerInner } from "./Drawer";
export * from "./Drawer/src/typing";

export const { Dropdown } = DropdownComponents;
export * from "./Dropdown/src/typing";

export const { EllipsisText } = EllipsisTextComponents;

export const { ImpExcel, ExpExcelModal } = ExcelComponents;
export { jsonToSheetXlsx, aoaToSheetXlsx } from "./Excel";
export * from "./Excel/src/typing";

export const { FlowChart } = FlowChartComponents;

export const {
  BasicForm,
  ApiSelect,
  ApiMulSelect,
  RadioButtonGroup,
  ApiTreeSelect,
  ApiTree,
  ApiRadioGroup,
  ApiCascader,
  ApiTransfer,
} = FormComponents;
export * from "./Form/src/types/form";
export * from "./Form/src/types/formItem";
export { useComponentRegister, useForm } from "./Form";

export const { Icon, SvgIcon, IconPicker } = IconComponents;

export const { Loading } = LoadingComponents;
export { useLoading, createLoading } from "./Loading";

export const { MarkDown, MarkdownViewer } = MarkdownComponents;
export * from "./Markdown/src/typing";

export const { BasicMenu } = MenuComponents;

export const { BasicModal } = ModalComponents;
export { useModalContext, useModal, useModalInner } from "./Modal";
export * from "./Modal/src/typing";

export const { PageFooter, PageWrapper } = PageComponents;

export const { ImagePreview } = PreviewComponents;
export { createImgPreview } from "./Preview";

export { Dialog } from "./Prompt";
export { createPrompt, genFormSchemas } from "./Prompt";
export * from "./Prompt/state";

export const { QrCode } = QrcodeComponents;
export * from "./Qrcode/src/typing";

export const { Scrollbar } = ScrollbarComponents;
export * from "./Qrcode/src/typing";

export const { SimpleMenu, SimpleMenuTag } = SimpleMenuComponents;

export const { StrengthMeter } = StrengthMeterComponents;

export const { BasicTable, TableAction, EditTableHeaderIcon, TableImg } =
  TableComponents;
export * from "./Table/src/types/table";
export * from "./Table/src/types/pagination";
export * from "./Table/src/types/tableAction";
export { useTable } from "./Table";

export const { Time } = TimeComponents;

export const { Tinymce } = TinymceComponents;

export {
  CollapseTransition,
  FadeTransition,
  ScaleTransition,
  SlideYTransition,
  ScrollYTransition,
  SlideYReverseTransition,
  ScrollYReverseTransition,
  SlideXTransition,
  ScrollXTransition,
  SlideXReverseTransition,
  ScrollXReverseTransition,
  ScaleRotateTransition,
  ExpandXTransition,
  ExpandTransition,
} from "./Transition";

export const { BasicTree } = TreeComponents;
export * from "./Tree/src/types/tree";

export const { ImageUpload, BasicUpload } = UploadComponents;

export const { BasicDragVerify, RotateDragVerify } = VerifyComponents;
export * from "./Verify/src/typing";

export const { VScroll } = VirtualScrollComponents;

export default { install };
