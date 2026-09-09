import { darkCssIsReady, loadDarkThemeCss } from "vite-plugin-theme/es/client";
import { addClass, hasClass, removeClass } from "utils/domUtils";
import { getGlobalConfig } from "utils/global";

export async function updateDarkTheme(mode: string | null = "light") {
  const htmlRoot =
    document.getElementById("htmlRoot") || document.documentElement;
  if (!htmlRoot) {
    return;
  }

  const hasDarkClass = hasClass(htmlRoot, "dark");
  let globalConfig = getGlobalConfig();

  if (mode === "dark") {
    // 生产环境需要加载暗色主题 CSS
    if (!globalConfig?.isEnv && !darkCssIsReady) {
      try {
        await loadDarkThemeCss();
      } catch (error) {}
    }

    htmlRoot.setAttribute("data-theme", "dark");
    if (!hasDarkClass) {
      addClass(htmlRoot, "dark");
    }
  } else {
    htmlRoot.setAttribute("data-theme", "light");
    if (hasDarkClass) {
      removeClass(htmlRoot, "dark");
    }
  }
}
