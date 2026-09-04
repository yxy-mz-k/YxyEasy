import type { App } from "vue";
import { withInstall } from "utils/index";
import { componentRegistry } from "./registry";

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

import * as MarkdownComponents from "./Markdown";
// 处理 Application 组件（已经有 install）
Object.values(MarkdownComponents).forEach((comp) => {
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

import * as QrcodeComponents from "./Qrcode";
// 处理 Application 组件（已经有 install）
Object.values(QrcodeComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
  }
});

import * as StrengthMeterComponents from "./StrengthMeter";
// 处理 Application 组件（已经有 install）
Object.values(StrengthMeterComponents).forEach((comp) => {
  if (typeof comp === "object" && comp !== null) {
    allComponents.push(comp);
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

export const { CountdownInput, CountButton } = CountDownComponents;

export const { CountTo } = CountToComponents;

export const { CropperImage, CropperAvatar } = CropperComponents;
export * from "./Cropper/src/typing";

export const { Description } = CropperComponents;
export { useDescription } from "./Description";
export * from "./Description/src/typing";

export const { Description } = DivideTitleComponents;

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

export const { MarkDown, MarkdownViewer } = MarkdownComponents;
export * from "./Markdown/src/typing";

export const { BasicModal } = ModalComponents;
export { useModalContext, useModal, useModalInner } from "./Modal";
export * from "./Modal/src/typing";

export const { PageFooter, PageWrapper } = PageComponents;

export const { QrCode } = QrcodeComponents;
export * from "./Qrcode/src/typing";

export const { StrengthMeter } = StrengthMeterComponents;

export const { Time } = TimeComponents;

export const { Tinymce } = TinymceComponents;

export const { ImageUpload, BasicUpload } = UploadComponents;

export const { BasicDragVerify, RotateDragVerify } = VerifyComponents;
export * from "./Verify/src/typing";

export const { VScroll } = VirtualScrollComponents;

export default { install };
