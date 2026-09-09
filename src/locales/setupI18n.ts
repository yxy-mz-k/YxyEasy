import type { App } from "vue";
import type { I18n, I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { setHtmlPageLang, setLoadLocalePool } from "./helper";
import { localeSetting } from "settings/localeSetting";
import { useLocaleStoreWithOut } from "store/modules/locale";

const { fallback, availableLocales } = localeSetting;

let i18n: ReturnType<typeof createI18n> | null = null;

// 获取 i18n 实例
export function getI18n(): ReturnType<typeof createI18n> {
  if (!i18n) {
    // 创建一个临时的 i18n 实例
    i18n = createI18n({
      legacy: false,
      locale: "zh_CN",
      fallbackLocale: fallback,
      messages: {},
      sync: true,
      silentTranslationWarn: true,
      missingWarn: false,
      silentFallbackWarn: true,
    });
  }
  return i18n;
}

// 为了兼容，导出 i18n（使用 getter）
export const i18n = new Proxy({} as ReturnType<typeof createI18n>, {
  get(target, prop) {
    const instance = getI18n();
    return (instance as any)[prop];
  },
  set(target, prop, value) {
    const instance = getI18n();
    (instance as any)[prop] = value;
    return true;
  },
});

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
  return i18n;
}
