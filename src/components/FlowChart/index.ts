import { withInstall } from "utils/withInstall";
import flowChart from "./src/FlowChart.vue";
import flowChartToolbar from "./src/FlowChartToolbar.vue";
import flowChartTooltip from "./src/FlowChartTooltip.vue";

export const FlowChart = withInstall(flowChart);
export const FlowChartToolbar = withInstall(flowChartToolbar);
export const FlowChartTooltip = withInstall(flowChartTooltip);
export { createFlowChartContext } from "./src/useFlowContext";
export { configDefaultDndPanel } from "./src/config";

import StartNode from "./src/StartNode";
import EndNode from "./src/EndNode";

export { StartNode, EndNode };
