import { withInstall } from "utils/index";
import codeEditor from "./src/CodeEditor.vue";
import jsonPreview from "./src/json-preview/JsonPreview.vue";
import highJsonView from "./src/json-preview/HighJsonView.vue";

export const CodeEditor = withInstall(codeEditor);
export const JsonPreview = withInstall(jsonPreview);
export const HighJsonView = withInstall(highJsonView);

export * from "./src/typing";
